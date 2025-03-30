import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import CardDetail from './CardDetail.jsx';
import axios from 'axios';

function SpreadReader({ deckID}){
  const [deckCards, setDeckCards] = useState([]);
  const [spread, setSpread] = useState([])
  
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardMeanings, setCardMeanings] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [dealtCards, setDealtCards] = useState([]);
  
  // dealtcardcount = 0;

  const generateNullArray = (length) => {
    return Array.from({ length }, () => null);
  };    

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get(`/api/decks/1/`);
        setDeckCards(response.data);
        // setLoading(false);
      } catch (err) {
        // setError(err);
        // setLoading(false);
      }
    };

    
    const fetchSpread = async () =>{
      try {
        const response = await axios.get(`/api/spread/1/`);
        setSpread(response.data);
        const numcards = response.data.positions.length
        setNumberOfCards(numcards);
        setDealtCards(generateNullArray(numcards));
        // setLoading(false);
      } catch (err) {
        // setError(err);
        // setLoading(false);
      }
    }
    fetchDeck();
    fetchSpread();
  },[]);

  
  const dealCard = () => {
    // event.preventDefault();
  
    if (deckCards.length === 0) return;
  
    const availableCards = deckCards.filter(
      (cardData) => !dealtCards.some((dealt) => dealt && dealt.deck_card.id === cardData.deck_card.id)
    );
  
    if (availableCards.length === 0) return;
  
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const rcard = availableCards[randomIndex];
  
    const nextSlot = dealtCards.findIndex((c) => c === null);

    if (nextSlot !== -1) {
      // Update assignedCards state
      const newAssignedCards = [...dealtCards];
      newAssignedCards[nextSlot] = rcard;
      setDealtCards(newAssignedCards);
    } else {
      alert('All card slots are filled.');
    }
  };

  const handleCardClick = async (cardData) => {
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
    setSelectedCard(cardData);
  }

  const handleClearCards = () => {
    setDealtCards(generateNullArray(numberOfCards));
    setSelectedCard(null);
    setCardMeanings([]);
  };

  
  // console.log(deckCards)
  return (
    <div className="relative w-screen h-screen border bg-gray-300">
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded font-serif"
          onClick={dealCard}
        >
          Deal Cards
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded font-serif"
          onClick={handleClearCards}
        >
          Clear Cards
        </button>
      </div>

      {spread && spread.positions ? spread.positions.map((positionData, index) => (
        <div style={{position:"absolute", top:positionData.top +'%', left:positionData.left+'%',}} >
        {positionData.name}
        <Card cardData={dealtCards[index]}
              onClick= {() => handleCardClick(dealtCards[index])}
              isSelected={selectedCard === dealtCards[index]}/>
        </div>)) : null
        }
      
      <CardDetail selectedCard={selectedCard} cardMeanings={cardMeanings}/>
    </div>
  )
    
}
export default SpreadReader;