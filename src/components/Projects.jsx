import ProjectsDescription from "./ProjectsDescription";
import ProjectsCard from "./ProjectsCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { SplitText } from "gsap/SplitText";

const Projects = () => {
  const projectsSectionRef = useRef(null);
  const isNotDesktop = useMediaQuery({ maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  // reading from docs you can refresh the page with using window.location.reload()
  useEffect(() => {
    let wasDesktop = window.innerWidth >= 1024;

    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 1024;
      if (wasDesktop !== isNowDesktop) {
        window.location.reload();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // should always be running
  useGSAP(() => {
    const projectsItem = gsap.utils.toArray(".project-item");
    gsap.set(projectsItem, {
      yPercent: 20,
      opacity: 0.4,
    });

    projectsItem.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        end: "top top",
        onUpdate(self) {
          const progress = self.progress;
          const yPercent = gsap.utils.interpolate(20, 0, progress);
          const opacity = gsap.utils.interpolate(0.4, 1, progress);
          gsap.set(item, {
            yPercent,
            opacity,
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
  }, []);
  // should only be running on desktop
  useGSAP(() => {
    if (isNotDesktop) {
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
  }, [isNotDesktop]);
  // should only be running on less than 1024
  useGSAP(() => {
    // i ain't going to clean this up for now
    if (isDesktop) return;
    const descriptionContainer1 = document.querySelector(
      ".projects-description-1",
    );
    const label1 = document.querySelector(".project-lable-1");
    const number1 = document.querySelector(".project-number-1");
    const expand1 = document.querySelector(".project-expnad-1");
    const title1 = document.querySelector(".project-title-1");
    const description1 = document.querySelector(".project-description-1");

    const descriptionContainer2 = document.querySelector(
      ".projects-description-2",
    );
    const label2 = document.querySelector(".project-lable-2");
    const number2 = document.querySelector(".project-number-2");
    const expand2 = document.querySelector(".project-expnad-2");
    const title2 = document.querySelector(".project-title-2");
    const description2 = document.querySelector(".project-description-2");

    const descriptionContainer3 = document.querySelector(
      ".projects-description-3",
    );
    const label3 = document.querySelector(".project-lable-3");
    const number3 = document.querySelector(".project-number-3");
    const expand3 = document.querySelector(".project-expnad-3");
    const title3 = document.querySelector(".project-title-3");
    const description3 = document.querySelector(".project-description-3");

    const configStagger = {
      labelStaggerAmount: 0.3,
      numberStaggerAmount: 0.2,
      titleStaggerAmount: 0.3,
      descriptionStaggerAmount: 0.2,
    };

    const configDuration = {
      labelDurationAmount: 1,
      numberDurationAmount: 1,
      expandDurationAmount: 2,
      titleDurationAmount: 1,
      descriptionDurationAmount: 1.5,
    };

    document.fonts.ready.then(() => {
      SplitText.create(label1, {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.words, {
            yPercent: 100,
            duration: configDuration.labelDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.labelStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer1,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(number1, {
        type: "chars",
        mask: "chars",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.chars, {
            yPercent: 100,
            duration: configDuration.numberDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.numberStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer1,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(expand1, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.lines, {
            yPercent: 100,
            rotation: 360,
            duration: configDuration.expandDurationAmount,
            ease: "power3.out",
            scrollTrigger: {
              trigger: descriptionContainer1,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(title1, {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.words, {
            yPercent: 100,
            duration: configDuration.titleDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.titleStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer1,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(description1, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.lines, {
            yPercent: 100,
            duration: configDuration.descriptionDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.descriptionStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer1,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });

    document.fonts.ready.then(() => {
      SplitText.create(label2, {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.words, {
            yPercent: 100,
            duration: configDuration.labelDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.labelStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer2,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(number2, {
        type: "chars",
        mask: "chars",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.chars, {
            yPercent: 100,
            duration: configDuration.numberDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.numberStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer2,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(expand2, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.lines, {
            yPercent: 100,
            rotation: 360,
            duration: configDuration.expandDurationAmount,
            ease: "power3.out",
            scrollTrigger: {
              trigger: descriptionContainer2,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(title2, {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.words, {
            yPercent: 100,
            duration: configDuration.titleDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.titleStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer2,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(description2, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.lines, {
            yPercent: 100,
            duration: configDuration.descriptionDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.descriptionStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer2,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });

    document.fonts.ready.then(() => {
      SplitText.create(label3, {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.words, {
            yPercent: 100,
            duration: configDuration.labelDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.labelStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer3,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(number3, {
        type: "chars",
        mask: "chars",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.chars, {
            yPercent: 100,
            duration: configDuration.numberDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.numberStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer3,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(expand3, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.lines, {
            yPercent: 100,
            rotation: 360,
            duration: configDuration.expandDurationAmount,
            ease: "power3.out",
            scrollTrigger: {
              trigger: descriptionContainer3,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(title3, {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.words, {
            yPercent: 100,
            duration: configDuration.titleDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.titleStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer3,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
    document.fonts.ready.then(() => {
      SplitText.create(description3, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.lines, {
            yPercent: 100,
            duration: configDuration.descriptionDurationAmount,
            ease: "power3.out",
            stagger: {
              amount: configStagger.descriptionStaggerAmount,
              from: "start",
            },
            scrollTrigger: {
              trigger: descriptionContainer3,
              start: `top 75%`,
              emd: "top center",
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    });
  }, [isDesktop]);

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
      {projectsData.map(({ id, number, label, title, description }, i) => {
        const index = i + 1;
        return (
          <div
            key={id}
            className="project-item"
            style={{
              marginBottom: index === projectsData.length - 1 ? "25vh" : "10vh",
            }}
          >
            <div className="project-item-inner">
              <ProjectsDescription
                number={number}
                label={label}
                title={title}
                description={description}
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
