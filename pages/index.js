import styles from '../styles/Home.module.css';
import { ProjectCard } from "@/components/ProjectCard";
import Layout from '@/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useIntro from 'helpers/useIntro';
import { getCollections } from 'lib/unsplash';
import { FiArrowRight } from 'react-icons/fi';
import ReactMarkdown from "react-markdown";

const variants = {
  initial: { y: "10px", opcaity: 0 },
  animate: { y: 0, opacity: 1 }
}


export default function Home(props) {
  const showAnimation = useIntro();

  const { 
    projects,
    photos,
    title,
    intro,
    about,
    projectTitle
   } = props;

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
            {title[0]}
          </motion.h1>
          <motion.h2
            initial={showAnimation ? "initial" : { opacity: 1 }}
            animate={showAnimation && "animate"}
            transition={{delay: 2, y: { type: "spring"}}}
            variants={variants}
          >
            {title[1]}
          </motion.h2>
          <motion.p
            initial={showAnimation ? "initial" : { opacity: 1 }}
            animate={showAnimation && "animate"}
            transition={{delay: 3, y: { type: "spring"}}}
            variants={variants}
          >
              {title[2]}
          </motion.p>
        </div>
        <motion.div
          className={styles.infoContainer}
          initial={showAnimation ? "initial" : { opacity: 1 }}
          animate={showAnimation && "animate"}
          transition={{delay: 4.8, y: { type: "spring"}}}
          variants={variants}
        >
          <ReactMarkdown children={intro} />
        </motion.div>

        <motion.div
          className={styles.aboutContainer}
          initial={showAnimation ? "initial" : { opacity: 1 }}
          animate={showAnimation && "animate"}
          transition={{delay: 4.8, y: { type: "spring"}}}
          variants={variants}  
        >
         <ReactMarkdown children={about} />
        </motion.div>

        <motion.div 
          className={styles.projectContainer}
          initial={showAnimation ? "initial" : { opacity: 1 }}
          animate={showAnimation && "animate"}
          transition={{delay: 4.8, y: { type: "spring"}}}
          variants={variants}  
        >
          <h4>{projectTitle}</h4>
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

export const getStaticProps = async () => {
    const repos = await fetch('http://localhost:3000/api/github?sort=created', {
        method: 'GET',
    });

    const pageContent = await fetch("http://localhost:1337/api/homepage");

    const homePage = await pageContent.json();
    const title = homePage.data.attributes.title.split('\n');

    const { intro, about, projectTitle } = homePage?.data?.attributes;


    const repoData = await repos.json();

    const photos = await getCollections();
    console.log(photos);

    return {
        props: {
          projects: repoData.filteredRepos.slice(0,4),
          photos,
          title,
          intro,
          about,
          projectTitle
        }
    }
}
