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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {deckCards.map((cardData) => (
          <div
            key={cardData.deck_card.id}
            style={{
              width: '16.6666%',
              boxSizing: 'border-box',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <h3>{cardData.card.name}</h3>
            {cardData.image && cardData.image.image_path && (
              <img
                src={`/static/${cardData.image.image_path}`}
                alt={cardData.card.name}
                style={{ maxWidth: '90%', maxHeight: '150px' }}
              />
            )}
            <p style={{ fontSize: '0.8em', marginTop: '5px' }}>
              {cardData.card.value && `Value: ${cardData.card.value}`}
            </p>
            <p style={{ fontSize: '0.8em' }}>
              {cardData.card.suit && `Suit: ${cardData.card.suit}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeckView;