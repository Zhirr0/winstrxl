import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
const Home = () => {
  return (
    <section>
        <Hero/>
        <Projects />
        <div className="h-[200vh] max-[1024px]:h-[20dvh]"></div>
        <Footer />
    </section>
  )
}

export default Home
