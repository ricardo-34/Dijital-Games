// components/GameCard.js
import Link from 'next/link';
import styles from '../styles/GameCard.module.css';

export default function GameCard({ game }) {
  return (
    <div className={styles.gameCard}>
      <Link href={`/games/${game.id}`}>
        <a>
          <div className={styles.gameImage}>
            <img src={game.image_url} alt={game.title} />
          </div>
          <div className={styles.gameInfo}>
            <h3>{game.title}</h3>
            <span className={styles.gameGenre}>{game.genre}</span>
          </div>
        </a>
      </Link>
    </div>
  );
}