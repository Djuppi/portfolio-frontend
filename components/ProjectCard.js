import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from '@/styles/ProjectCard.module.css';

const squareVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: .2 } },
  hidden: { opacity: 0, y: "10px" }
};

export const ProjectCard = ({id, chosen, setChosen, project}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

    return (
      <motion.div 
        ref={ref} 
        className={chosen === id ? styles.bigCard : styles.card} 
        onClick={() => setChosen(chosen === id ? 0 : id)}
        animate={controls}
        initial="hidden"
        variants={squareVariants}
      >
          {project.name}
          <img src={project.homepageImage && project.homepageImage} alt="" />
      </motion.div>
    )
  }