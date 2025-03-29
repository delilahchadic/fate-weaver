import React, { useState, useEffect } from 'react';
import ReadingView from './ReadingView'; // Adjust the path as needed

function ReadingLayout() {
  const [selectedDeckId, setSelectedDeckId] = useState(1); // Default deck ID
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    // Fetch decks from your API
    const fetchDecks = async () => {
      try {
        const response = await fetch('/api/decks/'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch decks');
        }
        const data = await response.json();
        setDecks(data);
      } catch (error) {
        console.error('Error fetching decks:', error);
      }
    };

    fetchDecks();
  }, []);

  const handleDeckChange = (event) => {
    setSelectedDeckId(parseInt(event.target.value, 10));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center p-4">
        <img src={"/static/images/logo.jpg"} alt="App Logo" className="h-24 w-30 mr-4" />
        <h1 className="text-xl serif">fateweaver</h1>
      </header>

      {/* Deck Selection */}
      <div className="p-4">
        <label htmlFor="deckSelect" className="mr-2">Select Deck:</label>
        <select
          id="deckSelect"
          value={selectedDeckId}
          onChange={handleDeckChange}
          className="border rounded p-2"
        >
          {decks.map((deck) => (
            <option key={deck.id} value={deck.id}>
              {deck.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content (ReadingView) */}
      <main className="flex-1 overflow-auto">
        <ReadingView deckId={selectedDeckId} />
      </main>
    </div>
  );
}

export default ReadingLayout;