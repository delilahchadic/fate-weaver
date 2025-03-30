// src/App.js
import React from 'react';
import ReadingView from './ReadingView';
import ReadingLayout from './ReadingLayout';
import Spread from './Spread';
import SpreadReader from './SpreadReader';
function App() {
  return (
    <div className="App">
      {/* <ReadingLayout/> // Replace 1 with your deck ID */}
      <SpreadReader deckId={1} />
    </div>
  );
}

export default App;