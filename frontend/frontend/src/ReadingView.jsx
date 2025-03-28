import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReadingView({ deckId }) {
  const [deckCards, setDeckCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dealtCards, setDealtCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardMeanings, setCardMeanings] = useState([]);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get(`/api/decks/${deckId}/`);
        setDeckCards(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleReadingAreaRightClick = (event) => {
    event.preventDefault();

    if (deckCards.length === 0) return;

    const availableCards = deckCards.filter(
      (cardData) => !dealtCards.some((dealt) => dealt.card.id === cardData.card.id)
    );

    if (availableCards.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];

    const cardWidth = 100;
    const cardHeight = 150;
    console.log(event.ta)
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - cardWidth / 2;
    const y = event.clientY - cardHeight / 2
    cardHeight / 2;

    setDealtCards((prevDealtCards) => [
      ...prevDealtCards,
      {
        ...selectedCard,
        x: x - cardWidth / 2,
        y: y - cardHeight / 2,
      },
    ]);
  };

  const handleCardClick = async (cardData) => {
    setSelectedCard(cardData);
    setCardMeanings([]);

    try {
      const response = await axios.get(`/api/cards/${cardData.card.id}/meanings/`);

      const groupedMeanings = response.data.reduce((acc, meaning) => {
        const typeName = meaning.meaning_type.name;
        if (!acc[typeName]) {
          acc[typeName] = [];
        }
        acc[typeName].push(meaning.value);
        return acc;
      }, {});

      const formattedMeanings = Object.entries(groupedMeanings).map(([typeName, values]) => ({
        typeName,
        values: values.join(', '),
      }));

      setCardMeanings(formattedMeanings);
    } catch (error) {
      console.error('Error fetching card meanings:', error);
    }
  };

  const handleClearCards = () => {
    setDealtCards([]);
    setSelectedCard(null);
    setCardMeanings([]);
  };

  if (loading) {
    return <p className="text-center mt-[50px] font-serif text-[#4C5270]">Loading cards...</p>;
  }

  if (error) {
    return <p className="text-center mt-[50px] font-serif text-[#F652A0]">Error: {error.message}</p>;
  }

  return (
    <div className="flex w-screen h-screen z-30 font-serif text-[#4C5270]">
      <div className="relative" style={{ width: `calc(100vw - 320px)` }}>
        <h2 className="text-center text-[#4C5270] mb-5 font-serif">Reading Area</h2>
        <div
          className="shadow-md rounded-lg relative"
          style={{
            backgroundImage: `url('/static/images/background.png')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            marginLeft: '50px',
            width: `calc(70vw - 360px)`,
            paddingBottom: `calc(70vw - 360px)`,
            height: 0,
          }}
          onContextMenu={handleReadingAreaRightClick}
        >
          {dealtCards.map((cardData, index) => (
            <img
              key={index}
              src={`/static/${cardData.image.image_path}`}
              alt={cardData.card.name}
              style={{
                position: 'absolute',
                left: cardData.x,
                top: cardData.y,
                maxWidth: '100px',
                zIndex: 2,
                cursor: 'pointer',
                border: selectedCard && selectedCard.card.id === cardData.card.id ? '3px solid #F652A0' : 'none',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
              }}
              onClick={() => handleCardClick(cardData)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded font-serif"
            onClick={handleClearCards}
          >
            Clear Cards
          </button>
        </div>
      </div>
      <div className="w-[290px] p-5 shadow-sm rounded-lg ml-2">
        <h2 className="text-[#4C5270] mb-5 font-serif">Card Details</h2>
        {selectedCard && (
          <div>
            <img
              src={`/static/${selectedCard.image.image_path}`}
              alt={selectedCard.card.name}
              className="max-w-[180px] rounded-md shadow-md mb-2"
            />
            <p>
              <strong>Name:</strong> {selectedCard.card.name}
            </p>
            <p>
              <strong>Value:</strong> {selectedCard.card.value}
            </p>
            <p>
              <strong>Suit:</strong> {selectedCard.suit.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedCard.card.description}
            </p>
            <div>
              <h3>Meanings:</h3>
              {cardMeanings.length > 0 ? (
                cardMeanings.map((meaning) => (
                  <div key={meaning.typeName}>
                    <strong>{meaning.typeName}:</strong> {meaning.values}
                  </div>
                ))
              ) : (
                <p>No meanings available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadingView;