import Transition from '../../components/Transition'
import '../../styles/posters.css'
import PosterHero from './PosterHero'

const Posters = () => {
  return (
    <main className='poster-page'>
      <PosterHero />
      <div className='h-svh'/>
    </main>
  );
}

export default Transition(Posters)