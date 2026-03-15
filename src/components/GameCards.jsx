import { useEffect, useRef } from "react";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import { games } from '../config/esportGameCards'

export default function GameCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".es-game-card");

    cards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.killTweensOf(cards);
        cards.forEach((sibling) => {
          gsap.to(sibling, {
            opacity: sibling === card ? 1 : 0.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      };

      const handleMouseLeave = () => {
        gsap.killTweensOf(cards);
        gsap.to(cards, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    });
  }, []);

  return (
    <div className="es-games-grid" style={{ padding: "10px" }}>
      <div ref={containerRef} className="es-games-container">
        {games.map((game) => (
          <div key={game.title} className="es-game-card">
            <Magnetic>
              <img
                src={`/svg/client-logos/${game.logo}`}
                alt={game.title}
                style={{ marginBottom: "10px" }}
                className="es-game-icon"
              />
            </Magnetic>
            <span className="es-game-title">{game.title}</span>
            <span className="es-game-count">{game.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
