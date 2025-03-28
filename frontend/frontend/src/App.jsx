// src/App.js
import React from 'react';
import ReadingView from './ReadingView';
import ReadingLayout from './ReadingLayout';

function App() {
  return (
    <div className="App">
      <ReadingLayout/>{/* Replace 1 with your deck ID */}
    </div>
  );
}

export default App;