import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css';

const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- THIS IS THE CORRECTED FUNCTION ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // ------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await axios.post('http://localhost:5001/api/feedbacks', formData);
      setFormData({ name: '', email: '', message: '' });
      onFeedbackSubmitted();
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Submit Feedback</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4"></textarea>
      </div>
      <button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default FeedbackForm;