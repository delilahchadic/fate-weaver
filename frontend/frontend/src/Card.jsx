import React, { useState, useEffect } from 'react';

function Card({ cardData, onClick, isSelected}){
  const [image, setImage] = useState([]);
  const cardWidth = 3;
  const cardHeight = 75;

  const cardStyle = {
    border: isSelected ? '2px solid blue' : '1px solid gray',
    cursor: 'pointer',
  };
  
  if(cardData == null){
    return(<div style={{width:'3vh', height:'3vh',}} className ="bg-indigo-200"></div>);
  } else{return (
    <div onClick={onClick}>
      <img
            // key={index}
            src={`/static/${cardData.deck_card.image_path}`}
            alt={cardData.card.name}
            style={{
              position: 'absolute',
              left: cardData.x,
              top: cardData.y,
              maxWidth: '5vw',
              zIndex: 2,
              cursor: 'pointer',
              border: isSelected ? '3px solid #F652A0' : 'none',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
              borderRadius: '5px',
            }}
            onClick={() => handleCardClick(cardData)}
          />
    </div>
  )}
    
}
export default Card;