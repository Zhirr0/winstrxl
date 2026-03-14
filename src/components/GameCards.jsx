import { useEffect, useRef } from "react";
import gsap from "gsap";
import Magnetic from "./Magnetic";

const games = [
  { title: "Adept Club", count: "12 projects", logo: "Adept Club.svg" },
  {
    title: "Coffein Esports",
    count: "9 projects",
    logo: "Coffein Esports.svg",
  },
  { title: "Kodex Esports", count: "7 projects", logo: "Kodex Esports.svg" },
  { title: "Lumina Gaming", count: "8 projects", logo: "Lumina Gaming.svg" },
  {
    title: "Nexus77 Esports",
    count: "4 projects",
    logo: "Nexus77 Esports.svg",
  },
  {
    title: "Souls Heart Esports",
    count: "11 projects",
    logo: "Souls Heart Esports.svg",
  },
  {
    title: "Syndicate Gaming",
    count: "6 projects",
    logo: "Syndicate Gaming.svg",
  },
  { title: "Xravel Esports", count: "5 projects", logo: "Xravel Esports.svg" },
];

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
