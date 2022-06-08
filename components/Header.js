import Link from 'next/link'
import React from 'react'
import styles from '@/styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href="/">
                <a>Djuppi</a>
            </Link>
        </div>
        <nav>
            <ul>
                <li>
                    <Link href="/projects">
                        <a>Projects</a>
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
