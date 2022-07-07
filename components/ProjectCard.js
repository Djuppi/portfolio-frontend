import React, { useEffect, useState } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from '@/styles/ProjectCard.module.css';
import cls from "classnames";

const textVariants = {
  visible: { opacity: 1, y: "20px", transition: { duration: .2 } },
  hidden: { opacity: 0, y: "40px", transition: { duration: .2 } }
};

const variants = {
  cardAnimate: { transform: 'scale(1.1)', transition: { duration: .4 } },
  cardInitial: { transform: 'scale(1)', transition: { type: "spring", stiffness: 100, duration: .4 } },
  overlayVisible: { opacity: .5, transition: { duration: .2 } },
  overlayHidden: { opacity: 0, transition: { duration: .2 } },
  textVisible: { opacity: 1, y: "20px", transition: { duration: .2 } },
  textHidden: { opacity: 0, y: "40px", transition: { duration: .2 } }
}

export const ProjectCard = ({id, chosen, setChosen, project, photo}) => {
  const [isHovered, setHovered] = useState(false);

  const imgUrl = photo?.urls?.thumb || '/assets/img/noimage.jpg';

  const imageStyles = {
    background: `transparent url(${imgUrl}) no-repeat`,
    backgroundSize: 'cover'
  }

    return (
        <motion.div
          className={styles.card} 
          onClick={() => setChosen(chosen === id ? 0 : id)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={imageStyles}
          animate={isHovered ? "cardAnimate" : 'cardInitial'}
          initial="cardInitial"
          variants={variants}
        >
          <motion.div
            className={styles.overlay}
            animate={isHovered ? "overlayVisible": "overlayHidden"}
            variants={variants}
            initial="overlayHidden"
          ></motion.div>
            <h1>{project.name}</h1>
              <motion.p
                animate={ isHovered ? "textVisible" : "textHidden"}
                variants={variants}
                initial="textHidden"
              >
                {project.description.slice(0,100)}
              </motion.p>
        </motion.div>
    )
  }