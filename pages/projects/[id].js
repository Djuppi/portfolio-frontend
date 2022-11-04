import Layout from '@/components/Layout';
import React from 'react';
import styles from '@/styles/Project.module.css';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Project ({repo}) {

  const router = useRouter();
  
    return (
        <Layout>
          
            <div className={styles.container}>
            <button className={styles.back} onClick={() => router.back()}>Go back</button>
                <h1 className={styles.title}>{repo.name}</h1>
                <p className={styles.description}>{repo.description}</p>

                {repo.homepage && <p>Visit the page <a href={repo.homepage} rel="norefferer" target="_blank">here</a></p>}
                {repo.homepageImage && (
                  <figure className={styles.imageContainer}>
                    <Image src={repo.homepageImage} alt='' width="500" height={240}/>
                  </figure>
                )}
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
  const repos = await fetch('http://localhost:3005/api/github?sort=created', {
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
  const repos = await fetch('http://localhost:3005/api/github?sort=created', {
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