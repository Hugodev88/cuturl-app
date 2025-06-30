import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import UrlAnalytics from '../components/UrlAnalytics';

const DashboardPage = () => {
  const [urls, setUrls] = useState([]);
  const [user, setUser] = useState(null);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedUrlId, setSelectedUrlId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlResponse = await api.get('/url');
        setUrls(urlResponse.data);

        const userResponse = await api.get('/user/me'); // Assuming this endpoint exists
        setUser(userResponse.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  const handleViewAnalytics = (urlId) => {
    setSelectedUrlId(urlId);
    setShowAnalyticsModal(true);
  };

  const handleCloseAnalytics = () => {
    setShowAnalyticsModal(false);
    setSelectedUrlId(null);
  };

  return (
    <div>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>
      {user && (
        <div className="user-info">
          <h3>Welcome, {user.email}!</h3> {/* Assuming user object has an email field */}
          <Link to="/subscribe">
            <button>Subscribe Now</button>
          </Link>
        </div>
      )}
      <h3>Your Shortened URLs:</h3>
      {urls.length > 0 ? (
        <ul className="dashboard-list">
          {urls.map((url) => (
            <li key={url._id}>
              <p><strong>Original URL:</strong> <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></p>
              <p><strong>Short URL:</strong> <a href={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/url/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/url/${url.shortUrl}`}</a></p>
              <p><strong>Clicks:</strong> {url.clicks}</p>
              {url.password && <p><strong>Password Protected:</strong> Yes</p>}
              {url.expiresAt && <p><strong>Expires At:</strong> {new Date(url.expiresAt).toLocaleString()}</p>}
              <button onClick={() => handleViewAnalytics(url._id)}>View Analytics</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No URLs shortened yet.</p>
      )}

      {showAnalyticsModal && selectedUrlId && (
        <UrlAnalytics urlId={selectedUrlId} onClose={handleCloseAnalytics} />
      )}
    </div>
  );
};

export default DashboardPage;
