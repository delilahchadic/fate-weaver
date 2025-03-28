import React from 'react';

function CardDetail({selectedCard, cardMeanings}){
  return(<div className="w-[290px] p-5 shadow-sm rounded-lg ml-2">
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
  </div>)
}export default CardDetail;
