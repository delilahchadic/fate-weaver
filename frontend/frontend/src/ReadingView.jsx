import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardDetail from './CardDetail';
import ReadingArea from './ReadingArea';

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

 

  if (loading) {
    return <p className="text-center mt-[50px] font-serif text-[#4C5270]">Loading cards...</p>;
  }

  if (error) {
    return <p className="text-center mt-[50px] font-serif text-[#F652A0]">Error: {error.message}</p>;
  }

  return (
    <div className="flex w-screen h-screen z-30 font-serif text-[#4C5270]">
      <ReadingArea deckCards={deckCards}/>
      
    </div>
  );
}

export default ReadingView;