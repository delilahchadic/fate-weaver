import React, { useState } from 'react';
import CardDetail from './CardDetail';

function ReadingArea({ deckCards }) {
  const [dealtCards, setDealtCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardMeanings, setCardMeanings] = useState([]);

  const handleReadingAreaRightClick = (event) => {
    event.preventDefault();
  
    if (deckCards.length === 0) return;
  
    const availableCards = deckCards.filter(
      (cardData) => !dealtCards.some((dealt) => dealt.deck_card.id === cardData.deck_card.id)
    );
  
    if (availableCards.length === 0) return;
  
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];
  
    const cardWidth = 50;
    const cardHeight = 75;
  
    const rect = event.target.getBoundingClientRect(); // Get reading area's position
  
    const x = event.clientX - rect.left - cardWidth / 2; // Relative x
    const y = event.clientY - rect.top - cardHeight / 2; // Relative y
  
    setDealtCards((prevDealtCards) => [
      ...prevDealtCards,
      {
        ...selectedCard,
        x: x,
        y: y,
      },
    ]);
  };

  const handleCardClick = async (cardData) => {
    console.log(cardData)
    setSelectedCard(cardData);
    setCardMeanings([]);

    try {
      const response = await fetch(`/api/cards/${cardData.deck_card.id}/meanings/`);
      const data = await response.json();

      const groupedMeanings = data.reduce((acc, meaning) => {
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

  return (
    <div className='flex'>
      <div className="relative" style={{ width: `calc(100vw - 320px)` }}>
      <h2 className="text-center text-[#4C5270] mb-5 font-serif">Reading Area</h2>
      <div
        className="shadow-md rounded-lg relative"
        style={{
          backgroundImage: `url('/static/images/background.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          marginLeft: '50px',
          width: `calc(60vw - 360px)`,
          paddingBottom: `calc(60vw - 360px)`,
          height: 0,
        }}
        onContextMenu={handleReadingAreaRightClick}
      >
        {dealtCards.map((cardData, index) => (
          <img
            key={index}
            src={`/static/${cardData.deck_card.image_path}`}
            alt={cardData.card.name}
            style={{
              position: 'absolute',
              left: cardData.x,
              top: cardData.y,
              maxWidth: '50px',
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
    <CardDetail selectedCard={selectedCard} cardMeanings={cardMeanings}/>
    </div>
    

  );
}

export default ReadingArea;