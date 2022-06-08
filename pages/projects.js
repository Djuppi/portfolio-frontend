import { Layout } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import styles from '@/styles/ProjectPage.module.css'
import { useState } from 'react';
import Link from 'next/link';

export default function ProjectPage({ projects }) {
    const [chosen, setChosen] = useState(0);

    return (
        <Layout title="Projects">
            <h1>My projects</h1>
            <div className={styles.container}>
                {projects.map((project, key) => {
                    console.log(project)
                    return <ProjectCard id={key+1} chosen={chosen} setChosen={setChosen} project={project} />
                })}
            </div>
            <div className={styles.left}>
                <Link href='/' className={styles.left} scroll={false}>Home</Link>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const repos = await fetch('http://localhost:3000/api/github', {
        method: 'GET',
    })
    const data = await repos.json();

    return {
        props: {projects: data.filteredRepos}
    }
}
