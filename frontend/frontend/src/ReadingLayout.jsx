import React from 'react';
import ReadingView from './ReadingView'; // Adjust the path as needed
// import logo from './logo.png'; // Import your logo image

function ReadingLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center p-4">
        <img src={"/static/images/logo.jpg"} alt="App Logo" className="h-24 w-30 mr-4" />
        <h1 className="text-xl serif">fateweaver</h1>
      </header>

      {/* Main Content (ReadingView) */}
      <main className="flex-1 overflow-auto">
        <ReadingView deckId={1} />
      </main>
    </div>
  );
}

export default ReadingLayout;