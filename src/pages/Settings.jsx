import React from 'react';

const Settings = () => {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
        <p>Manage your organization settings and account preferences.</p>
      </div>
    </div>
  );
};

export default Settings;
