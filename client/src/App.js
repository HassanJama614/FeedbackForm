import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css'; // Import the main App styles

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFeedbackSubmitted = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Feedback Manager</h1>
        <p>A Basic MERN Stack Application</p>
      </header>
      <main className="main-content">
        <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
        <FeedbackList refreshKey={refreshKey} />
      </main>
    </div>
  );
}

export default App;