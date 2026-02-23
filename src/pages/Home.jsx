import ButtonSvgPath from '../components/ButtonSvgPath'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import ProjectsSection from '../components/ProjectsSection'
import ButtonSvgPathDesktop from '../components/ButtonSvgPathDesktop'
import Transition from '../components/Transition'

// eslint-disable-next-line react-refresh/only-export-components
const Home = () => {
  return (
    <section>
        <ButtonSvgPath />
        <ButtonSvgPathDesktop />
        <Hero/>
        <ProjectsSection />
        <div className="h-[200vh] max-[1024px]:h-[20dvh] max-[768px]:h-[40dvh]"></div>
        <Footer />
    </section>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default Transition(Home)
