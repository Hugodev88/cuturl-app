import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const MainPage = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/url/shorten', { originalUrl, password, expiresAt });
      setShortUrl(response.data.shortUrl);
      toast.success('URL shortened successfully!');
      setPassword('');
      setExpiresAt('');
    } catch (error) {
      toast.error('Failed to shorten URL. Please try again.');
      console.error('Failed to shorten URL', error);
    }
  };

  return (
    <div className="main-page">
      <div className="main-page-content">
        <h1>Shorten Your Links, Track Your Clicks.</h1>
        <p className="tagline">Simple, powerful, and effective URL management.</p>
        <form onSubmit={handleSubmit} className="shorten-form">
          <input
            type="text"
            placeholder="Enter your long URL here..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            autocomplete="off"
          />
          <input
            type="password"
            placeholder="Optional: Password for URL"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="new-password"
          />
          <label htmlFor="expiresAt">Optional: Expiration Date</label>
          <input
            type="datetime-local"
            id="expiresAt"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            autocomplete="off"
          />
          <button type="submit">Shorten Now</button>
        </form>
        {shortUrl && (
          <div className="short-url-display">
            <p>Your Short URL:</p>
            <a href={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/url/${shortUrl}`} target="_blank" rel="noopener noreferrer">{`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/url/${shortUrl}`}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
