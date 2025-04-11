// pages/index.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GameCard from '../components/GameCard';
import styles from '../styles/Layout.module.css';

export default function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20;

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch('http://localhost:5000/api/games');
        if (response.ok) {
          const data = await response.json();
          setGames(data);
          setFilteredGames(data);
        } else {
          console.error('Failed to fetch games');
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1); // Resetear a la primera página cuando se busca
    
    if (term.trim() === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => 
        game.title.toLowerCase().includes(term) || 
        (game.description && game.description.toLowerCase().includes(term))
      );
      setFilteredGames(filtered);
    }
  };

  // Calcular las páginas totales
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  
  // Obtener los juegos de la página actual
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Cambiar de página
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll hacia arriba al cambiar de página
  };
  
  // Generar números de páginas para mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Número de botones de página visibles
    
    if (totalPages <= maxVisiblePages) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Lógica para mostrar páginas alrededor de la actual
      if (currentPage <= 3) {
        // Si estamos cerca del inicio
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Si estamos cerca del final
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // En medio
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <Layout title="Dijital Games - Juegos gratuitos para descargar">
      <div className={styles.hero}>
        <h1>Dijital Games</h1>
        <div className={styles.searchWrapper}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar juegos..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className={styles.loading}>Cargando juegos...</div>
      ) : (
        <>
          <p className={styles.resultsInfo}>
            {searchTerm ? `Mostrando ${filteredGames.length} resultado${filteredGames.length !== 1 ? 's' : ''} para "${searchTerm}"` : ''}
          </p>
          <div className={styles.gamesGrid}>
            {currentGames.length > 0 ? (
              currentGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))
            ) : (
              <p className={styles.noGames}>
                {searchTerm ? 'No se encontraron juegos con ese término.' : 'No hay juegos disponibles actualmente.'}
              </p>
            )}
          </div>
          
          {/* Paginación */}
          {filteredGames.length > 0 && (
            <div className={styles.pagination}>
              <button 
                onClick={() => goToPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                Atrás
              </button>
              
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => goToPage(page)}
                    className={`${styles.paginationButton} ${currentPage === page ? styles.activePage : ''}`}
                  >
                    {page}
                  </button>
                )
              ))}
              
              <button 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}