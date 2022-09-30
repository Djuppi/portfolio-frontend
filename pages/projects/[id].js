import Layout from '@/components/Layout';
import React from 'react';
import styles from '@/styles/Project.module.css';
import ReactMarkdown from 'react-markdown';

export default function Project ({repo}) {
  
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>{repo.name}</h1>
                <p className={styles.description}>{repo.description}</p>

                {repo.homepage && <p>Visit the page <a href={repo.homepage} rel="norefferer" target="_blank">here</a></p>}

                <h2>Topics:</h2>
                <div className={styles.topicsContainer}>
                  {repo.topics.map((topic, key) => {
                    return (
                      <div key={key}>
                        <p>{topic}</p>
                      </div>
                    )
                  })}
                </div>
                </div>
        </Layout>
    )
}

export const getStaticProps = async ({params}) => {
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