import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  TOTAL_ROWS,
  IMAGES_PER_ROW,
  TOTAL_IMAGES,
  IMAGE_COUNT,
} from "../config/projects.config";
import {
  getRandomHeight,
  createImagePool,
  shuffle,
} from "../utils/projectsGallery.helper";

/* Populates the gallery element with image nodes, runs the staggered
   entrance animation, and cleans up the nodes on unmount */
export function useGalleryImages(galleryRef, imagesRef) {
  useGSAP(() => {
    const gallery = galleryRef.current;
    const images = [];

    let pool = shuffle(createImagePool());
    let poolIndex = 0;

    for (let i = 0; i < TOTAL_IMAGES; i++) {
      if (poolIndex === IMAGE_COUNT) {
        pool = shuffle(createImagePool());
        poolIndex = 0;
      }

      const img = document.createElement("div");
      img.className = "img";
      img.style.height = `${getRandomHeight()}px`;

      const imgElement = document.createElement("img");
      imgElement.src = `/images/img${pool[poolIndex]}.webp`;
      poolIndex++;

      img.appendChild(imgElement);
      gallery.appendChild(img);
      images.push(img);
    }

    imagesRef.current = images;

    gsap.to(images, {
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
      stagger: {
        amount: 1.5,
        grid: [TOTAL_ROWS, IMAGES_PER_ROW],
        from: "random",
      },
      ease: "power3.inOut",
    });

    return () => {
      images.forEach((img) => img.remove());
    };
  }, []);
}
