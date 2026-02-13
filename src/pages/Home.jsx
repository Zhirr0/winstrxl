import ButtonSvgPath from '../components/ButtonSvgPath'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import ButtonSvgPathDesktop from '../components/ButtonSvgPathDesktop'
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

export default Home
