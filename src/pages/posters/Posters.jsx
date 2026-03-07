import Transition from '../../components/Transition'
import '../../styles/posters.css'
import PosterHero from './PosterHero'
import PosterHorizontal from './PosterHorizontal'

const Posters = () => {
  return (
    <main className='poster-page'>
      <PosterHero />
      <div className='h-svh'/>
      <PosterHorizontal />
    </main>
  );
}

export default Transition(Posters)