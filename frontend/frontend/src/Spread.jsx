import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import CardDetail from './CardDetail.jsx';
import axios from 'axios';

function Spread({ deckID}){
  const [deckCards, setDeckCards] = useState([]);
  const [dealtCards, setDealtCards] = useState([null, null, null, null,null, null,null,null,null,null]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardMeanings, setCardMeanings] = useState([]);
  // dealtcardcount = 0;

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
    fetchDeck();
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
    setDealtCards([null, null, null, null,null, null,null,null,null,null]);
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
      <div style={{position:"absolute", top:'50%', left:'50%',}} >
        the present
        <Card cardData={dealtCards[0]}
              onClick= {() => handleCardClick(dealtCards[0])}
              isSelected={selectedCard === dealtCards[0]}/>
      </div>
      <div style={{position:"absolute", top:'50%', left:'57%',}} >
        the challenge
        <Card cardData={dealtCards[1]}
              onClick= {() => handleCardClick(dealtCards[1])}
              isSelected={selectedCard === dealtCards[1]}/>
      </div>

      <div style={{position:"absolute", top:'75%', left:'53.5%',}} >
        your focus
        <Card cardData={dealtCards[2]}
              onClick= {() => handleCardClick(dealtCards[2])}
              isSelected={selectedCard === dealtCards[2]}/>
      </div>

      <div style={{position:"absolute", top:'50%', left:'43%',}} >
        past
        <Card cardData={dealtCards[3]}
              onClick= {() => handleCardClick(dealtCards[3])}
              isSelected={selectedCard === dealtCards[3]}/>
      </div>

      <div style={{position:"absolute", top:'25%', left:'53.5%',}} >
        strengths
        <Card cardData={dealtCards[4]}
              onClick= {() => handleCardClick(dealtCards[4])}
              isSelected={selectedCard === dealtCards[4]}/>
      </div>

      <div style={{position:"absolute", top:'50%', left:'64%',}} >
        near future
        <Card cardData={dealtCards[5]}
              onClick= {() => handleCardClick(dealtCards[5])}
              isSelected={selectedCard === dealtCards[5]}/>
      </div>

      <div style={{position:"absolute", top:'75%', left:'80%',}} >
        suggestion
        <Card cardData={dealtCards[6]}
              onClick= {() => handleCardClick(dealtCards[6])}
              isSelected={selectedCard === dealtCards[6]}/>
      </div>

      <div style={{position:"absolute", top:'50%', left:'80%',}} >
        surrounding influences
        <Card cardData={dealtCards[7]}
              onClick= {() => handleCardClick(dealtCards[7])}
              isSelected={selectedCard === dealtCards[7]}/>
      </div>

      <div style={{position:"absolute", top:'25%', left:'80%',}} >
        hopes and fears
        <Card cardData={dealtCards[8]}
              onClick= {() => handleCardClick(dealtCards[8])}
              isSelected={selectedCard === dealtCards[8]}/>
      </div>

      <div style={{position:"absolute", top:'0%', left:'80%',}} >
        final outcome
        <Card cardData={dealtCards[9]}
              onClick= {() => handleCardClick(dealtCards[9])}
              isSelected={selectedCard === dealtCards[9]}/>
      </div>
      
      <CardDetail selectedCard={selectedCard} cardMeanings={cardMeanings}/>
    </div>
  )
    
}
export default Spread;