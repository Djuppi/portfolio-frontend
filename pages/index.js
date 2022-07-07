import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { ProjectCard } from "@/components/ProjectCard";
import { Layout } from '@/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useIntro from 'helpers/useIntro';
import { useEffect } from 'react';
import { getCollections } from 'lib/unsplash';
import { FiArrowRight } from 'react-icons/fi';

const variants = {
  initial: { y: "10px", opcaity: 0 },
  animate: { y: 0, opacity: 1 }
}


export default function Home({projects, photos}) {
  const showAnimation = useIntro();

  return (
    <Layout title="Djuppi">
      <div className={styles.container}>
      {/* @toDo - Rewrite this to CMS */}
        <div 
          className={styles.headerContainer} 
          
        >
          <motion.h1
            initial={showAnimation ? "initial" : { opacity: 1 }}
            animate={showAnimation ? "animate" : { opacity: 1 }}
            transition={{delay: 1, y: { type: "spring"}}}
            variants={variants}
          >
            Welcome, my name is Aske
          </motion.h1>
          <motion.h2
            initial={showAnimation ? "initial" : { opacity: 1 }}
            animate={showAnimation && "animate"}
            transition={{delay: 2, y: { type: "spring"}}}
            variants={variants}
          >
              I'm a frontend developer
          </motion.h2>
          <motion.p
            initial={showAnimation ? "initial" : { opacity: 1 }}
            animate={showAnimation && "animate"}
            transition={{delay: 3, y: { type: "spring"}}}
            variants={variants}
          >
              specialized in JS and React
          </motion.p>
        </div>
        <motion.div
          className={styles.infoContainer}
          initial={showAnimation ? "initial" : { opacity: 1 }}
          animate={showAnimation && "animate"}
          transition={{delay: 4.8, y: { type: "spring"}}}
          variants={variants}
        >
          <p>On this page you'll get to know a little bit of me and what I do. Below you can read a little about me, see my recent projects and connect with me on social media.</p>
          <p>At the top right, you can open the menu, where you will be able to navigate through this website and change the theme.</p>
        </motion.div>

        <motion.div
          className={styles.aboutContainer}
          initial={showAnimation ? "initial" : { opacity: 1 }}
          animate={showAnimation && "animate"}
          transition={{delay: 4.8, y: { type: "spring"}}}
          variants={variants}  
        >
          <h3>Short about me</h3>
          <p>I'm a 30 year old danish guy currently living in Oslo, Norway. Right now I'm working at Onecall, a telecom company in Norway, owned by Telia Norway, positioned as a frontend developer.</p>
          <p>In addition I'm the TeamLead for our technical department, which enabling me to live out my natural leader instinct.</p>
        </motion.div>

        <motion.div 
          className={styles.projectContainer}
          initial={showAnimation ? "initial" : { opacity: 1 }}
          animate={showAnimation && "animate"}
          transition={{delay: 4.8, y: { type: "spring"}}}
          variants={variants}  
        >
          <h4>My most recent projects</h4>
          <div className={styles.projects}>
            {projects.map((project, key) => {
              return <ProjectCard id={key+1} key={key} project={project} photo={photos[key]} />
            })}
          </div>
          <div className={styles.projectLink}>
            <Link href="/projects"><a>See all projects <FiArrowRight /></a></Link>
          </div>
        </motion.div>
        
        </div>
      
    </Layout>
    

  )
}

export const getServerSideProps = async () => {
    const repos = await fetch('http://localhost:3000/api/github?sort=created', {
        method: 'GET',
    })


    const repoData = await repos.json();

    const photos = await getCollections();

    return {
        props: {
          projects: repoData.filteredRepos.slice(0,4),
          photos,
        }
    }
}
