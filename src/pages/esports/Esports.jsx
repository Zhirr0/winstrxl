import '../../styles/esports.css'
import EsportsHero from './EsportsHero';
import Transition from '../../components/Transition'
import EsportFeaturedProject from './EsportFeaturedProject';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from 'react';

const Esports = () => {
  const spacerRef  = useRef(null)
  useGSAP(() => {
    gsap.set(spacerRef.current, {
      height: "20svh"
    })
  }, [])
  return (
    <main>
      <EsportsHero />
      <div ref={spacerRef}/>
      <EsportFeaturedProject />
      <div className="h-svh"></div>
    </main>
  );
}

export default Transition(Esports)