import FeaturedProjectCards from  "../../components/FeaturedProjectCard";
import FeaturedProjectHeader from "../../components/FeaturedProjectHeader";


export default function EsportFeaturedProject() {
  return (
    <section className="es-featured-project">
      <FeaturedProjectHeader />
      <FeaturedProjectCards />
    </section>
  );
}