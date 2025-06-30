import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UrlAnalytics = ({ urlId, onClose }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/url/analytics/${urlId}`);
        setAnalyticsData(response.data);
      } catch (err) {
        setError('Failed to fetch analytics data.');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    if (urlId) {
      fetchAnalytics();
    }
  }, [urlId]);

  if (loading) {
    return <div className="analytics-modal">Loading analytics...</div>;
  }

  if (error) {
    return <div className="analytics-modal"><p className="error-message">{error}</p><button onClick={onClose}>Close</button></div>;
  }

  if (!analyticsData) {
    return <div className="analytics-modal"><p>No analytics data available.</p><button onClick={onClose}>Close</button></div>;
  }

  return (
    <div className="analytics-modal">
      <h3>Analytics for Short URL</h3>
      <p><strong>Total Clicks:</strong> {analyticsData.clicks}</p>
      <h4>Click Details:</h4>
      {analyticsData.analytics.length > 0 ? (
        <ul className="analytics-list">
          {analyticsData.analytics.map((data, index) => (
            <li key={index}>
              <p><strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}</p>
              <p><strong>IP Address:</strong> {data.ipAddress || 'N/A'}</p>
              <p><strong>User Agent:</strong> {data.userAgent || 'N/A'}</p>
              {/* <p><strong>Country:</strong> {data.country || 'N/A'}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No detailed click data available yet.</p>
      )}
      <button onClick={onClose}>Close Analytics</button>
    </div>
  );
};

export default UrlAnalytics;