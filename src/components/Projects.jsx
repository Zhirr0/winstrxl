import ProjectsDescription from "./ProjectsDescription";
import ProjectsCard from "./ProjectsCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsSectionRef = useRef(null);
  const notAllowed = useMediaQuery({ maxWidth: 1024 });

  useGSAP(() => {
    const projectsItem = gsap.utils.toArray(".project-item");
    gsap.set(projectsItem, {
      yPercent: 20,
      opacity: 0.4
    });

    projectsItem.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        end: "top top",
        onUpdate(self) {
          const progress = self.progress;
          const yPercent = gsap.utils.interpolate(20, 0, progress);
          const opacity = gsap.utils.interpolate(0.4, 1, progress)
          gsap.set(item, {
            yPercent,
            opacity
          });
        },
      });
    });

    ScrollTrigger.create({
      trigger: ".project-item",
      start: "top bottom",
      end: "top 10%",
      onUpdate(self) {
        const progress = self.progress;
        gsap.to(".hero", {
          opacity: 1 - progress,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
    });

    if (notAllowed) {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === ".projects" && st.vars.pin) {
          st.kill();
        }
      });
      gsap.set(".projects", { clearProps: "all" });
      return;
    }
    gsap.set(".projects-description-3, .projects-card-3", {
      yPercent: -110,
    });

    ScrollTrigger.create({
      trigger: ".projects",
      pin: true,
      pinSpacing: false,
      start: "top top",
      end: () => `+=${projectsSectionRef.current.scrollHeight}px`,
      onEnter: () => {
        gsap.to(".project-item", {
          marginRight: ".5px",
          ease: "power3.out",
          duration: 0.2,
        });
      },
      onEnterBack: () => {
        gsap.to(".project-item", {
          marginRight: ".5px",
          ease: "power3.out",
          duration: 0.2,
        });
      },
      onUpdate(s) {
        const progress = s.progress * 100;

        // Phase 1: First card visible (0-20%)
        if (progress < 20) {
          gsap.set(".projects-description-1", {
            yPercent: 0,
            opacity: 1,
          });

          gsap.set([".projects-description-2", ".projects-card-2"], {
            yPercent: 0,
          });

          gsap.set([".projects-description-3", ".projects-card-3"], {
            yPercent: -110,
          });
        }
        // Phase 2: First transition - Card 1 out, Card 2 in (20-50%)
        else if (progress < 50) {
          const phaseProgress = (progress - 20) / 30;

          gsap.set(".projects-description-1", {
            yPercent: -200 * phaseProgress,
            opacity: 1 - phaseProgress * 2.5,
          });

          gsap.set([".projects-description-2", ".projects-card-2"], {
            yPercent: -110 * phaseProgress,
          });

          gsap.set([".projects-description-3", ".projects-card-3"], {
            yPercent: -110,
          });
        }
        // Phase 3: Second card visible (50-70%)
        else if (progress < 70) {
          gsap.set(".projects-description-1", {
            yPercent: -100,
            opacity: 0,
          });

          gsap.set([".projects-description-2", ".projects-card-2"], {
            yPercent: -110,
          });

          gsap.set([".projects-description-3", ".projects-card-3"], {
            yPercent: -110,
          });
        }
        // Phase 4: Second transition - Card 2 out, Card 3 in (70-90%)
        else if (progress < 90) {
          const phaseProgress = (progress - 70) / 20;

          gsap.set(".projects-description-1", {
            yPercent: -100,
            opacity: 0,
          });

          gsap.set(".projects-description-2", {
            yPercent: -110 - 100 * phaseProgress,
            opacity: 1 - phaseProgress * 1.5,
          });

          gsap.set([".projects-description-3", ".projects-card-3"], {
            yPercent: -110 - 125 * phaseProgress,
          });
        }
        // Phase 5: Third card visible (90-100%)
        else {
          gsap.set(".projects-description-1", {
            yPercent: -100,
            opacity: 0,
          });

          gsap.set(".projects-description-2", {
            yPercent: -210,
            opacity: 0,
          });

          gsap.set([".projects-description-3", ".projects-card-3"], {
            yPercent: -235,
          });
        }
      },
    });
  }, [notAllowed]);

  const projectsData = [
    {
      id: 1,
      number: "01",
      label: "FEATURED PROJECT",
      title: "PROJECT ONE",
      description:
        "Synthesis is a conceptual design project inspired by my lifelong fascination with motorsport, automotive engineering, and the aesthetics of racing culture. The project merges the spirit of racing with my vision for sportswear design - exploring the balance between functionality, utility, and energy through form and detail.",
    },
    {
      id: 2,
      number: "02",
      label: "FEATURED PROJECT",
      title: "PROJECT TWO",
      description:
        "Description for your second project goes here. Add compelling details about what makes this project unique and interesting.",
    },
    {
      id: 3,
      number: "03",
      label: "FEATURED PROJECT",
      title: "PROJECT THREE",
      description:
        "Description for your third project goes here. Showcase the key features and innovations of this work.",
    },
  ];

  return (
    <section ref={projectsSectionRef} className="projects">
      {projectsData.map((project, i) => {
        const index = i + 1;
        return (
          <div
            key={project.id}
            className="project-item"
            style={{
              marginBottom: index === projectsData.length - 1 ? "25vh" : "10vh",
            }}
          >
            <div className="project-item-inner">
              <ProjectsDescription
                number={project.number}
                label={project.label}
                title={project.title}
                description={project.description}
                index={index}
              />
              <ProjectsCard index={index} />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Projects;
