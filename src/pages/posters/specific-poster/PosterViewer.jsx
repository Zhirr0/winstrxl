import { useLocation, Link } from "react-router-dom";
import Transition from "../../../components/Transition";

const PosterViewer = () => {
  const { state } = useLocation();
  const img = state?.img;
  const title = state?.title;

  return (
    <div className="relative w-full min-h-svh flex items-center justify-center" style={{padding: "100px"}}>
      <Link
        to="/posters"
        className="fixed top-8 left-8 z-20 flex items-center gap-2 no-underline uppercase font-mono text-[11px] tracking-[3px] text-text-muted hover:text-light-primary transition-colors duration-200"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-3.5 h-3.5 stroke-current stroke-2"
        >
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
        Back
      </Link>

      <div className="flex items-center justify-center w-full h-svh px-8 py-16">
        {img ? (
          <img
            src={img}
            alt={title ?? "Poster"}
            className="max-w-full max-h-full object-contain block"
          />
        ) : (
          <p className="font-mono text-[12px] text-text-dim uppercase tracking-[3px]">
            No poster selected.
          </p>
        )}
      </div>
    </div>
  );
};

export default Transition(PosterViewer);
