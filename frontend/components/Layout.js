// components/Layout.js
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title = 'Dijital Games' }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Plataforma de descarga de juegos gratuitos" />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Dijital Games. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}