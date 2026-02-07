import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 768 });
  return (
    <section className="hero">
      <div></div>
      <h3>{isSmall ? "SCROLL" : "SCROLL DOWN"}</h3>
    </section>
  );
};

export default Hero;
