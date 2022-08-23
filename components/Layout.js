import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';
//import Footer from './Footer';
import styles from '@/styles/Layout.module.css';
import { motion } from 'framer-motion';
import ThemeChanger from 'helpers/ThemeChanger';
import dynamic from 'next/dynamic';
import { Suspense } from 'react'

 const DynamicFooter = dynamic(() => import('./Footer'), { suspense: true });
// const DynamicMenu = dynamic(() => import('./Menu'), { suspense: true });
const variants = {
    open: { x: -300, y: 100 },
    closed: { x: 0, y: 0 }
}

export default function Layout({title, description, keywords, children}) {
    const [isOpen, toggleOpen] = useState(false);

    const [colorTheme, setTheme] = ThemeChanger();

    const menuStyle = {
        display: "flex",
        "justifySelf": "flex-end",
        "gridColumn": "3",
        "alignSelf": "flex-start",
        cursor: "pointer",
        margin: "1rem",
        position: isOpen ? 'sticky' : 'fixed',
        top: isOpen ? '-70px' : ''
    }
    
    return (
        <>
        <div className={styles.menu}>
            
            <ul> 
                <li onClick={() => toggleOpen(false)} className={title === "Djuppi" ? styles.chosenPage : null}><Link href="/">Home</Link></li>
                <li onClick={() => toggleOpen(false)} className={title === "Projects" ? styles.chosenPage : null}><Link href="/projects">Projects</Link></li>
                <li onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={styles.scrollTop}>Change theme?</li>
            </ul>
            <div className={styles.themeChanger}>
                <button onClick={() => setTheme('default')}>
                    Whiskey blue
                </button>
                <button onClick={() => setTheme('stark')}>
                    Winterfell Grey
                </button>
                <button onClick={() => setTheme('lannister')}>
                    Lannister red
                </button>
            </div>
            <motion.div 
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{ type: 'linear' }}
            >
                <Head>
                <title>{title}</title>
                    <meta name='description' content={description} />
                    <meta name='keywords' content={keywords} />
                    <meta name='lang' content='en' />
                </Head>
                <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.name}>
                        <Image src='/assets/img/aske_thump.jpg' alt='' width={30} height={30}/>
                        <p>Aske Djupnes</p>
                    </div>
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
                        {/* <DynamicMenu isOpen={isOpen} /> */}
                    </motion.div>
                    {children}
                </main>
                <footer className={styles.footer}>
                    {/* <Footer /> */}
                    <Suspense fallback={'Loading...'}>
                        <DynamicFooter />
                    </Suspense>
                    
                </footer>
                </div>
            </motion.div>
        </div>
        </>
    )
}

Layout.defaultProps = {
    title: 'Djuppi | Web Developer',
    description: 'Frontend and API webdeveloper based in Oslo. ',
    keywords: 'Developer, Frontend, API, Norway, Oslo, Webdeveloper'
}