import ButtonSvgPath from "../components/ButtonSvgPath";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import ButtonSvgPathDesktop from "../components/ButtonSvgPathDesktop";
import Transition from "../components/Transition";

const Home = () => {
  return (
    <main>
      <ButtonSvgPath />
      <ButtonSvgPathDesktop />
      <Hero />
      <ProjectsSection />
      <div className="h-[200vh] max-[1024px]:h-[20svh] max-[768px]:h-[40svh]"></div>
      <Footer />
    </main>
  );
};

export default Transition(Home);
