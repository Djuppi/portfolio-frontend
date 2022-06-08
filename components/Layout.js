import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from './Header';
import styles from '@/styles/Layout.module.css';
import { motion } from 'framer-motion';
import { Menu } from './Menu';

const variants = {
    open: { x: -300, y: 100 },
    closed: { x: 0, y: 0}
}

const menuStyle = {
    display: "flex",
    "justify-self": "flex-end",
    "grid-column": "3",
    "align-self": "flex-start",
    cursor: "pointer",
    margin: "1rem"
}


export const Layout = ({title, description, keywords, children}) => {
    const [isOpen, toggleOpen] = useState(false);
    
    return (
        <div className={styles.menu}>
            <ul>
            <li onClick={() => toggleOpen(false)} className={title === "Home" ? styles.chosenPage : null}><Link href="/">Home</Link></li>
                <li onClick={() => toggleOpen(false)} className={title === "Projects" ? styles.chosenPage : null}><Link href="/projects">Projects</Link></li>
            </ul>
            <motion.div 
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{ type: 'linear' }}
            >
                <Head>
                <title>{title}</title>
                    <meta name='description' content={description} />
                    <meta name='keywords' content={keywords} />
                </Head>
                
                <main 
                    className={styles.container}
                >
                    <motion.div 
                        onClick={() => toggleOpen(!isOpen)} 
                        style={menuStyle} 
                        whileHover={{rotate: [0, -20, 20, -20, 20, 0]}}
                        transition={{ 
                            duration: .6,
                            ease: "easeInOut"
                        }}
                    >
                        <Menu isOpen={isOpen} />
                    </motion.div>
                    {children}
                </main>
            </motion.div>
        </div>
    )
}