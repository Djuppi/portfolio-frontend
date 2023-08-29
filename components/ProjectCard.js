import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from '@/styles/ProjectCard.module.css';
import Link from "next/link";
import classNames from "classnames";

const variants = {
  // Animations for the card box
  cardAnimate: { transform: 'scale(1.1)', transition: { duration: .4 } },
  cardInitial: { transform: 'scale(1)', transition: { type: "spring", stiffness: 100, duration: .4 } },
  // Animations for the overlay on the cards
  overlayVisible: { opacity: .5, transition: { duration: .2 } },
  overlayHidden: { opacity: 0, transition: { duration: .2 } },
  // Animations for the description on the card
  textVisible: { opacity: 1, y: "20px", transition: { duration: .2 } },
  textHidden: { opacity: 0, y: "40px", transition: { duration: .2 } },
  // Animations for the button
  buttonInitial: { textDecoration: 'none' },
  buttonHover: { backgroundColor: "var(--hover-color-primary)", textDecoration: "underline", transition: { duration: .2 } },
}

export const ProjectCard = ({project, photo}) => {
  const [isHovered, setHovered] = useState(false);

  const imgUrl = photo || '/assets/img/noimage.jpg';

  const imageStyles = {
    background: `transparent url(${imgUrl}) no-repeat`,
    "backgroundSize": 'cover'
  }

    return (
        <motion.div
          className={project.isFinished ? styles.card : `${styles.card} ${styles.ongoing}`} 
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
              <Link href={`/projects/${project.id}`}>
                <motion.div 
                  className={styles.link}
                  animate={isHovered ? "textVisible" : "textHidden"}

                  variants={variants}
                  initial="buttonInitial"
                  whileHover="buttonHover"
                >
                  See more
                </motion.div>
              </Link>
        </motion.div>
    )
  }