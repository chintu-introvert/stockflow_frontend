import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Settings = () => {
  const [threshold, setThreshold] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/settings');
        // Handle cases where response might be an object or the value directly
        const value = response.data.defaultLowStockThreshold ?? response.data;
        setThreshold(value);
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await axios.put('/settings', { defaultLowStockThreshold: threshold });
      setSuccess('Settings saved!');
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container"><div className="loading-container">Loading settings...</div></div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Organization Settings</h1>
      </div>

      <div className="form-card" style={{ marginLeft: 0 }}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="threshold">Default Low Stock Threshold</label>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              This value is used as the default threshold for new products if not specified.
            </p>
            <input
              id="threshold"
              type="number"
              min="0"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value) || 0)}
              required
              style={{ maxWidth: '200px' }}
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && (
            <p style={{ 
              color: 'var(--success-color)', 
              fontSize: '0.875rem', 
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              ✅ {success}
            </p>
          )}

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={saving}
            style={{ width: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
