import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeckView({ deckId }) {
  const [deckCards, setDeckCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/decks/${deckId}/`)
      .then((response) => {
        setDeckCards(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [deckId]);

  if (loading) {
    return <p>Loading cards...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Deck Cards</h2>
      <div>
        {deckCards.map((cardData) => (
          <div key={cardData.deck_card.id}>
            <h3>{cardData.card.name}</h3>
            {cardData.image && cardData.image.image_path && (
              <img
                src={`/static/${cardData.image.image_path}`}
                alt={cardData.card.name}
                style={{ maxWidth: '200px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeckView;