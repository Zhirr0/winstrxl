import '../../styles/esports.css'
import EsportsHero from './EsportsHero';
import Transition from '../../components/Transition'
const Esports = () => {
  return (
    <main>
      <EsportsHero />
    </main>
  );
}

export default Transition(Esports)