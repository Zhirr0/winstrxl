import FeaturedProjectCards from "./FeaturedProjectCard";
import FeaturedProjectHeader from "./FeaturedProjectHeader";


export default function EsportFeaturedProject() {
  return (
    <section className="es-featured-project">
      <FeaturedProjectHeader />
      <FeaturedProjectCards />
    </section>
  );
}