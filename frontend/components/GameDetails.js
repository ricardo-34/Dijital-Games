// components/GameDetails.js
import styles from '../styles/GameDetails.module.css';

export default function GameDetails({ game }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className={styles.gameDetails}>
      <div className={styles.gameHeader}>
        <h1>{game.title}</h1>
        <span className={styles.gameGenre}>{game.genre}</span>
      </div>
      
      <div className={styles.gameContent}>
        <div className={styles.gameImageContainer}>
          <img src={game.image_url} alt={game.title} className={styles.gameImage} />
          
          <div className={styles.gameActions}>
            <a href={game.download_url} className={styles.downloadButton}>
              Descargar Juego
            </a>
          </div>
        </div>
        
        <div className={styles.gameInfo}>
          <div className={styles.infoSection}>
            <h2>Acerca del juego</h2>
            <p>{game.description}</p>
          </div>
          
          <div className={styles.infoSection}>
            <h2>Detalles</h2>
            <ul className={styles.detailsList}>
              <li><strong>Desarrollador:</strong> {game.publisher}</li>
              <li><strong>Fecha de lanzamiento:</strong> {formatDate(game.release_date)}</li>
              <li><strong>Género:</strong> {game.genre}</li>
            </ul>
          </div>
          
          <div className={styles.infoSection}>
            <h2>Requisitos del sistema</h2>
            <div className={styles.systemRequirements}>
              <ul>
                <li><strong>Sistema operativo:</strong> {game.os_requirements}</li>
                <li><strong>Procesador:</strong> {game.processor_requirements}</li>
                <li><strong>Memoria:</strong> {game.memory_requirements}</li>
                <li><strong>Gráficos:</strong> {game.graphics_requirements}</li>
                <li><strong>Almacenamiento:</strong> {game.storage_requirements}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}