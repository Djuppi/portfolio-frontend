import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import styles from '@/styles/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.contact}>
                <p>Email:</p>
                <a href='mailto:askeda@gmail.com'>askeda@gmail.com</a>
            </div>
            <div className={styles.social}>
                <a
                    className={styles.linkedIn}
                    aria-label="LinkedIn"
                    href='https://www.linkedin.com/in/aske-djupnes-ammentorp-03434984/' 
                    target="_blank" 
                    rel='noreferrer'
                >
                    <span><FaLinkedin className={styles.icon} /></span>   
                </a>
                <a 
                    className={styles.insta}
                    aria-label="Instagram"
                    href="https://www.instagram.com/laske60/"    
                    target="_blank" 
                    rel='noreferrer'
                >
                    <span><FaInstagram className={styles.icon} /></span>
                </a>
                <a 
                    className={styles.github}
                    aria-label="Github"
                    href="https://github.com/Djuppi/"    
                    target="_blank" 
                    rel='noreferrer'
                >
                    <span>
                        <FaGithub className={styles.icon} />
                    </span>
                </a>
            </div>
            <div className={styles.copyright}>
                <p>Copyright&#169; 2022</p>
                <p>Djuppi</p>
            </div>
        </div>
    )
} 