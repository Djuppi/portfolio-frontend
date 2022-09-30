import Layout from "@/components/Layout";
import styles from '@/styles/About.module.css';
import { useState } from "react";
import Events from '../api/data/timeline.json';
import ReactMarkdown from "react-markdown";

export default function About({title, richtext}) {
    const [noOfEvents, setNoOfEvents] = useState(3);
    const firstList = Events.slice(0,noOfEvents);
    const secondList = Events.slice(noOfEvents, noOfEvents+noOfEvents);

    return (
        <Layout title="About">
            <div className={styles.container}>
                <h1>{title}</h1>
                <p>Underneath you can choose to read about me or scroll through the interactive timeline to see the biggest events of my life.</p>

                <div>
                    <ReactMarkdown children={richtext} />
                </div>
                
                {/*<div className={styles.timelineContainer}>
                    <ul>
                       {Events.map((e, key) => {
                        return (
                            <li key={key}>
                                <span></span>
                                <div className={styles.title}>{e.title}</div>
                                <div className={styles.description}>{e.description}</div>
                                <div className={styles.date}>
                                    <span>{e.startDate}</span>
                                    {e.endDate && <span>{e.endDate}</span>}                            
                                </div> 
                            </li> 
                        )
                       })}
                    </ul>
            
                </div>*/}
            </div>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const pageContent = await fetch("http://localhost:1337/api/aboutPage");

    const aboutPage = await pageContent.json();

    const { title, richtext } = aboutPage?.data?.attributes;

    return {
        props: {
            title,
            richtext
        }
    }
}