import React from 'react';
import { useParams } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      </div>
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
        <p>{isEdit ? `Editing product ID: ${id}` : 'Create a new product entry.'}</p>
      </div>
    </div>
  );
};

export default ProductForm;
