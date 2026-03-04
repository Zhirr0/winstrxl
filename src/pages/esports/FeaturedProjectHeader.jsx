import { useMediaQuery } from "react-responsive";

export default function FeaturedProjectHeader() {
  const breakPoint = useMediaQuery({ maxWidth: 1024 });
  return (
    <div
      style={{ padding: breakPoint ? "14px 20px" : "18px 36px" }}
      className="es-section-header"
    >
      <span className="es-sh-left">Featured Project</span>
      <span className="es-sh-right">Spotlight · 2024</span>
    </div>
  );
}
