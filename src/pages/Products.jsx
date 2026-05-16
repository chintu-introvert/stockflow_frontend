import React from 'react';

const Products = () => {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
      </div>
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
        <p>Manage your product inventory here.</p>
      </div>
    </div>
  );
};

export default Products;
