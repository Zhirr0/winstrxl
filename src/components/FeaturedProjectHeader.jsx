import { useMediaQuery } from "react-responsive";

export default function FeaturedProjectHeader() {
  const breakPoint = useMediaQuery({ maxWidth: 1024 });
  return (
    <div
      style={{ padding: breakPoint ? "2px 5px" : "10px 15px" }}
      className="es-section-header"
    >
      <span className="es-sh-left">Featured Project</span>
      <span className="es-sh-right">Spotlight · 2026</span>
    </div>
  );
}
