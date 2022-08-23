import Layout from '@/components/Layout';
import React from 'react';
import styles from '@/styles/Project.module.css';

export default function Project ({repo}) {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>{repo.name}</h1>
                <p className={styles.description}>{repo.description}</p>
            </div>
        </Layout>
    )
}

export const getStaticProps = async ({params}) => {
    console.log({params})
  const repos = await fetch('http://localhost:3000/api/github?sort=created', {
        method: 'GET',
    })

    const repoData = await repos.json();

  const findRepoById = repoData.filteredRepos.find(repo => repo.id == params.id);

  return {
    props: {
      repo: findRepoById || {}
    }
  }
}

export const getStaticPaths = async () => {
  const repos = await fetch('http://localhost:3000/api/github?sort=created', {
        method: 'GET',
    })
    

    const repoData = await repos.json();
  const paths = repoData.filteredRepos.map(repo => {
    return {
      params: {
        id: repo.id.toString()
      }
    }
  });

  return {
    paths,
    fallback: true
  }
}