import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useMediaQuery } from "react-responsive";

const LeftMenuContainer = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const mouseConstraintRef = useRef(null);
  const animationFrameRef = useRef(null);
  const breakPoint = useMediaQuery({maxWidth: 1024})
  useEffect(() => {
    
    const config = {
      // Physics properties
      gravity: { x: 0, y: 1 },
      restitution: 0.5, // Bounciness (0-1)
      friction: 0.15, // Surface friction
      frictionAir: 0.02, // Air resistance
      density: 0.002, // Object mass

      // Wall properties
      wallThickness: 200,

      // Mouse interaction
      mouseStiffness: 0.6,

      // Initial positioning
      initialYOffset: 0, // Starting position above container (lower = closer to top)
      verticalSpacing: 80, // Space between letters (lower = closer together)
      randomXSpread: 0.8, // Horizontal randomness (0-1, higher = more spread)

      // Drop timing
      enableStaggeredDrop: true, // Drop letters one by one
      dropDelay: 150, // Milliseconds between each letter drop (if staggered)

      // Velocity limits
      maxDragVelocity: 20, // Max velocity when dragging

      // Top wall
      topWallDelay: breakPoint ? 10000000 : 3000, // When to add top wall (ms)

      // Engine iterations (higher = more accurate but slower)
      constraintIterations: 10,
      positionIterations: 20,
      velocityIterations: 16,
    };

    const clamp = (val, min, max) => {
      return Math.max(min, Math.min(max, val));
    };

    const initPhysics = (container) => {
      // Create engine
      const engine = Matter.Engine.create();
      engine.gravity = config.gravity;
      engine.constraintIterations = config.constraintIterations;
      engine.positionIterations = config.positionIterations;
      engine.velocityIterations = config.velocityIterations;
      engine.timing.timeScale = 1;
      engineRef.current = engine;

      const containerRect = container.getBoundingClientRect();
      const wallThickness = config.wallThickness;

      // Create walls (bottom, left, right)
      const walls = [
        Matter.Bodies.rectangle(
          containerRect.width / 2,
          containerRect.height + wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true },
        ),
        Matter.Bodies.rectangle(
          -wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true },
        ),
        Matter.Bodies.rectangle(
          containerRect.width + wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true },
        ),
      ];
      Matter.World.add(engine.world, walls);

      // Create physics bodies for each object
      const objects = container.querySelectorAll(".object");
      const bodies = [];

      objects.forEach((object, index) => {
        const objRect = object.getBoundingClientRect();

        // Calculate starting position
        const horizontalCenter = containerRect.width / 2;
        const randomOffset =
          (Math.random() - 0.5) * containerRect.width * config.randomXSpread;
        const startX = horizontalCenter + randomOffset;

        // Vertical spacing - much tighter now
        const startY = config.initialYOffset - index * config.verticalSpacing;
        const startRotation = (Math.random() - 0.5) * Math.PI * 0.3; // Reduced rotation

        const body = Matter.Bodies.rectangle(
          startX,
          startY,
          objRect.width,
          objRect.height,
          {
            restitution: config.restitution,
            friction: config.friction,
            frictionAir: config.frictionAir,
            density: config.density,
          },
        );

        Matter.Body.setAngle(body, startRotation);

        // If staggered drop is enabled, make bodies static initially
        if (config.enableStaggeredDrop) {
          Matter.Body.setStatic(body, true);
        }

        bodies.push({
          body,
          element: object,
          width: objRect.width * 0.9,
          height: objRect.height * 0.9,
          index: index,
        });

        Matter.World.add(engine.world, body);
      });

      bodiesRef.current = bodies;

      // Staggered drop animation
      if (config.enableStaggeredDrop) {
        bodies.forEach((bodyData, index) => {
          setTimeout(() => {
            Matter.Body.setStatic(bodyData.body, false);
          }, index * config.dropDelay);
        });
      }

      // Add top wall after delay
      setTimeout(() => {
        const topWall = Matter.Bodies.rectangle(
          containerRect.width / 2,
          -wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true },
        );
        Matter.World.add(engine.world, topWall);
      }, config.topWallDelay);

      // Create mouse constraint
      const mouse = Matter.Mouse.create(container);
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: config.mouseStiffness,
          render: { visible: false },
        },
      });
      mouseConstraint.mouse.element.oncontextmenu = () => false;
      mouseConstraintRef.current = mouseConstraint;

      let dragging = null;
      let originalInertia = null;

      // Handle drag start
      Matter.Events.on(mouseConstraint, "startdrag", (e) => {
        dragging = e.body;
        if (dragging) {
          originalInertia = dragging.inertia;
          Matter.Body.setInertia(dragging, Infinity);
          Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(dragging, 0);
        }
      });

      // Handle drag end
      Matter.Events.on(mouseConstraint, "enddrag", () => {
        if (dragging) {
          Matter.Body.setInertia(dragging, originalInertia || 1);
          dragging = null;
          originalInertia = null;
        }
      });

      // Before update - clamp dragging positions
      Matter.Events.on(engine, "beforeUpdate", () => {
        if (dragging) {
          const found = bodies.find((b) => b.body === dragging);
          if (found) {
            const minX = found.width / 2;
            const maxX = containerRect.width - found.width / 2;
            const minY = found.height / 2;
            const maxY = containerRect.height - found.height / 2;

            Matter.Body.setPosition(dragging, {
              x: clamp(dragging.position.x, minX, maxX),
              y: clamp(dragging.position.y, minY, maxY),
            });

            Matter.Body.setVelocity(dragging, {
              x: clamp(
                dragging.velocity.x,
                -config.maxDragVelocity,
                config.maxDragVelocity,
              ),
              y: clamp(
                dragging.velocity.y,
                -config.maxDragVelocity,
                config.maxDragVelocity,
              ),
            });
          }
        }
      });

      // Handle mouse leave and mouse up
      container.addEventListener("mouseleave", () => {
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.constraint.pointB = null;
      });
      container.addEventListener("mouseup", () => {
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.constraint.pointB = null;
      });

      Matter.World.add(engine.world, mouseConstraint);

      // Create and run the runner
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
      runnerRef.current = runner;

      // Animation loop
      const updatePosition = () => {
        bodies.forEach(({ body, element, width, height }) => {
          const x = clamp(
            body.position.x - width / 2,
            0,
            containerRect.width - width,
          );
          const y = clamp(
            body.position.y - height / 2,
            -height * 3,
            containerRect.height - height,
          );
          element.style.left = x + "px";
          element.style.top = y + "px";
          element.style.transform = `rotate(${body.angle}rad)`;
        });
        animationFrameRef.current = requestAnimationFrame(updatePosition);
      };
      updatePosition();
    };

    // Initialize physics when component mounts
    if (containerRef.current) {
      initPhysics(containerRef.current);
    }

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [breakPoint]);

  return (
    <div className="object-container" ref={containerRef}>
      <div className="object">
        <p>W</p>
      </div>
      <div className="object">
        <p>I</p>
      </div>
      <div className="object">
        <p>N</p>
      </div>
      <div className="object">
        <p>S</p>
      </div>
      <div className="object">
        <p>T</p>
      </div>
      <div className="object">
        <p>R</p>
      </div>
      <div className="object">
        <p>X</p>
      </div>
      <div className="object">
        <p>L</p>
      </div>
    </div>
  );
};

export default LeftMenuContainer;
