import React from 'react';
import LowStockTable from '../components/LowStockTable';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>
      <div className="card" style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
        <p>Welcome to your StockFlow dashboard. Real-time statistics and low stock alerts will appear here.</p>
      </div>
      
      <LowStockTable />
    </div>
  );
};

export default Dashboard;
