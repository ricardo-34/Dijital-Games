// pages/games/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import GameDetails from '../../components/GameDetails';

export default function GamePage() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGameDetails() {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/games/${id}`);
        
        if (!response.ok) {
          throw new Error('Juego no encontrado');
        }
        
        const data = await response.json();
        setGame(data);
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Cargando...">
        <div className="loading">Cargando detalles del juego...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Error">
        <div className="error">
          <h2>Error al cargar el juego</h2>
          <p>{error}</p>
          <button onClick={() => router.push('/')}>Volver a la página principal</button>
        </div>
      </Layout>
    );
  }

  if (!game) {
    return (
      <Layout title="Juego no encontrado">
        <div className="not-found">
          <h2>Juego no encontrado</h2>
          <button onClick={() => router.push('/')}>Volver a la página principal</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${game.title} - Dijital Games`}>
      <GameDetails game={game} />
    </Layout>
  );
}