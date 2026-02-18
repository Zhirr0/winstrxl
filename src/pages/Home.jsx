import ButtonSvgPath from '../components/ButtonSvgPath'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import ButtonSvgPathDesktop from '../components/ButtonSvgPathDesktop'
import Transition from '../components/Transition'

// eslint-disable-next-line react-refresh/only-export-components
const Home = () => {
  return (
    <section>
        <ButtonSvgPath />
        <ButtonSvgPathDesktop />
        <Hero/>
        <Projects />
        <div className="h-[200vh] max-[1024px]:h-[20dvh]"></div>
        <Footer />
    </section>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default Transition(Home)
