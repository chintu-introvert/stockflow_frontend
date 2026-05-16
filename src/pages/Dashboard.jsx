import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import LowStockTable from '../components/LowStockTable';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    lowStockCount: 0,
    lowStockItems: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/dashboard');
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <p>Loading dashboard statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message" style={{ marginTop: '2rem', textAlign: 'center' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Products</div>
          <div className="stat-value">{stats.totalProducts}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Quantity on Hand</div>
          <div className="stat-value">{stats.totalQuantity}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label" style={{ color: stats.lowStockCount > 0 ? 'var(--error-color)' : 'var(--text-secondary)' }}>
            Low Stock Items
          </div>
          <div className="stat-value" style={{ color: stats.lowStockCount > 0 ? 'var(--error-color)' : 'var(--text-primary)' }}>
            {stats.lowStockCount}
          </div>
        </div>
      </div>

      <LowStockTable items={stats.lowStockItems} />
    </div>
  );
};

export default Dashboard;
