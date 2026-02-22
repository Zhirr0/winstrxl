import { Link } from "react-router-dom";


const ProjectsDescription = ({ number, label, title, description, index }) => {
  
  return (
    <div style={{paddingTop: '10px'}} className={`projects-description relative projects-description-${index}`}>

      <p className={`project-label project-lable-${index}`}>{label}</p>
      <h2 className={`project-number project-number-${index}`}>{number}</h2>
      <div
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        className={`project-expand project-expnad-${index}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 8.5H20V10.5H11V20H9V10.5H0V8.5H9V0H11V8.5Z"
            fill="#fff"
          />
        </svg>
      </div>
      <h3 style={{ paddingBottom: "5px" }} className={`project-title project-title-${index}`}>
        {title}
      </h3>
      <p className={`project-description project-description-${index}`}>{description}</p>
      <Link to="/projects">
      <button className="button-projects-desktop ">View All Of The works</button>
      </Link>
    </div>
  );
};

export default ProjectsDescription;
