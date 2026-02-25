import { useEffect, useRef } from "react";
const isMobile = window.innerWidth < 1024
const VERT = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform vec2  iResolution;
  uniform float iTime;

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
      float t = iTime * 0.3;

      float f = sin(uv.x * 3.0 + t) * cos(uv.y * 3.0 + t * 0.7)
              + sin(uv.x * 6.1 + uv.y * 4.3 + t * 1.1) * 0.5
              + cos(uv.x * 8.5 - uv.y * 5.2 + t * 0.9) * 0.25
              + sin((uv.x + uv.y) * 10.0 + t * 1.4) * 0.125
              + cos(uv.x * 13.0 + uv.y * 9.0 - t * 0.6) * 0.0625;

      f = f * 0.5 + 0.5;

      float glow = pow(f, 1.8);
      float cracks = smoothstep(0.35, 0.65, f);
      float hotSpots = smoothstep(0.72, 1.0, f);

      vec3 color = vec3(0.0);
      color += vec3(0.15) * glow;
      color += vec3(0.5) * cracks;
      color += vec3(1.0) * hotSpots;

      float pulse = ${isMobile ? 0.1 : 0.005} + 0.04 * sin(iTime * 1.5 + f * 12.0);
      color *= pulse;

      fragColor = vec4(color, 1.0);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function CardBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, "iResolution");
    const uTime = gl.getUniformLocation(prog, "iTime");

    // Use the parent element's size — it's stable during GSAP pin
    // because GSAP doesn't change the parent's layout dimensions
    const setSize = () => {
      const parent = canvas.parentElement;
      const w = Math.round(parent.offsetWidth  * devicePixelRatio);
      const h = Math.round(parent.offsetHeight * devicePixelRatio);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    setSize();

    // window resize = real viewport change only, never fires on GSAP pin
    window.addEventListener("resize", setSize);

    let rafId;
    const start = performance.now();

    const render = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        transform: "translateZ(0)",
      }}
    />
  );
}