import Layout from "@/components/Layout";
import styles from '@/styles/About.module.css';
import { Fragment, useState } from "react";
import Events from '../api/data/timeline.json';

export default function About() {
    const [noOfEvents, setNoOfEvents] = useState(3);
    const firstList = Events.slice(0,noOfEvents);
    const secondList = Events.slice(noOfEvents, noOfEvents+noOfEvents);

    return (
        <Layout title="About">
            <div className={styles.container}>
                <h1>About me</h1>
                <p>Underneath you can choose to read about me or scroll through the interactive timeline to see my lifes biggest events.</p>

                <div className={styles.timelineContainer}>
                    <ul>
                       {Events.map((e, key) => {
                        return (
                            <li key={key}>
                                <span></span>
                                <div class="title">{e.title}</div>
                                <div class="description">{e.description}</div>
                                <div class="date">
                                    {e.date}                            
                                </div> 
                            </li> 
                        )
                       })}
                    </ul>
            
                </div>
            </div>
        </Layout>
    )
}