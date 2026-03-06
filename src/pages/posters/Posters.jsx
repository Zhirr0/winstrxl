import Transition from '../../components/Transition'
import '../../styles/posters.css'
import PosterHero from './PosterHero'

const Posters = () => {
  return (
    <main className='poster-page'>
      <PosterHero />
    </main>
  );
}

export default Transition(Posters)