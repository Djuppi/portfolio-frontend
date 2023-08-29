import Layout from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import styles from '@/styles/ProjectPage.module.css'
import { useState } from 'react';
import { getCollections } from 'lib/unsplash';

export default function ProjectPage({ projects, photos }) {
    const [chosen, setChosen] = useState(0);

    return (
        <Layout title="Projects">
            <div className={styles.container}>
            <h1 className={styles.header}>My projects</h1>
            <p className={styles.projectDesc}>Here you see all my finished and some of my ongoing projects. </p>
            
            <h2>Live projects</h2>
            <div className={styles.projects}>  
                {projects.map((project, key) => {
                    if(!project.topics.includes("course")) {
                        return <ProjectCard id={key+1} key={key} chosen={chosen} setChosen={setChosen} project={project} photo={photos[key]} />
                    }
                })}
            </div>

            <h3>Course based</h3>
            <div className={styles.projects}>  
                {projects.map((project, key) => {
                    if(project.topics.includes("course")) {
                        return <ProjectCard id={key+1} key={key} chosen={chosen} setChosen={setChosen} project={project} photo={photos[key]} />
                    }
                })}
            </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const repos = await fetch('http://localhost:3005/api/github', {
        method: 'GET',
    })
    const data = await repos.json();

    const photos = await getCollections();

    return {
        props: {
            projects: data.filteredRepos,
            photos
        }
    }
}
