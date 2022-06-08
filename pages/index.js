import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Layout } from '@/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

const variants = {
  initial: { x: "-10px", y: "10px", opcaity: 0 },
  animate: { x: 0, y: 0, opacity: 1 }
}


export default function Home() {
  return (
    <Layout title="Home">
      <h1>Welcome</h1>
      {/* @toDo - Rewrite this to CMS */}
      
      <motion.div className={styles.box} variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: .2 }} whileHover={{ translateY: "10px", transition: { duration: .2 } }}
      >
        <div className={styles.boxSecondary}></div>
        <h2>I'm Aske - A frontend developer currently positioned at Onecall - Telia Norway.</h2>
        <p>In addition I have the position as Team leader for the technical department at Onecall. My expertise is JavaScript and React, but I always strive to find new challenges and am eager to learn new technoligies. </p>
        <div className={styles.right}>
          <Link href="/projects" scroll={false}>Projects</Link>
        </div>
      </motion.div>
    </Layout>
    

  )
}
