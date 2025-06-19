import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackList.css'; // Import the CSS

const FeedbackList = ({ refreshKey }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/feedbacks');
        setFeedbacks(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch feedbacks.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [refreshKey]);

  if (loading) return <p className="loading-message">Loading feedbacks...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="list-container">
      <h2>Submitted Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p className="no-feedback-message">No feedback submitted yet.</p>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="feedback-item">
              <div className="feedback-header">
                <span className="name">{feedback.name}</span>
                <span className="email">- {feedback.email}</span>
              </div>
              <p className="feedback-message">{feedback.message}</p>
              <p className="feedback-date">
                Submitted on: {new Date(feedback.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackList;