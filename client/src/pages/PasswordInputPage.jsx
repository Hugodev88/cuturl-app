import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyPassword } from '../services/api';

const PasswordInputPage = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const shortUrl = queryParams.get('shortUrl');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (shortUrl) {
      try {
        const response = await verifyPassword(shortUrl, password);
        window.location.href = response.data.originalUrl;
      } catch (error) {
        toast.error('Invalid password');
      }
    }
  };

  return (
    <div className="password-input-page">
      <h2>Enter Password</h2>
      <p>This URL is password protected. Please enter the password to proceed.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordInputPage;