// src/App.js
import React from 'react';
import ReadingView from './ReadingView';

function App() {
  return (
    <div className="App">
      <ReadingView deckId={1} /> {/* Replace 1 with your deck ID */}
    </div>
  );
}

export default App;