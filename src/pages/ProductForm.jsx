import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    quantityOnHand: 0,
    costPrice: 0,
    sellingPrice: 0,
    lowStockThreshold: 5,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const settingsRes = await axios.get('/settings');
        const defaultThreshold = settingsRes.data.defaultLowStockThreshold ?? settingsRes.data;
        
        if (isEdit) {
          const productsRes = await axios.get('/products');
          const product = productsRes.data.find(p => p.id.toString() === id);
          
          if (product) {
            setFormData({
              name: product.name || '',
              sku: product.sku || '',
              description: product.description || '',
              quantityOnHand: Number(product.quantityOnHand || 0),
              costPrice: Number(product.costPrice || 0),
              sellingPrice: Number(product.sellingPrice || 0),
              lowStockThreshold: Number(product.lowStockThreshold ?? defaultThreshold ?? 5),
            });
          } else {
            setError('Product not found.');
          }
        } else {
          // New product path
          if (defaultThreshold !== undefined) {
            setFormData(prev => ({
              ...prev,
              lowStockThreshold: Number(defaultThreshold)
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        if (isEdit) setError('Failed to load product data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (isEdit) {
        await axios.put(`/products/${id}`, formData);
      } else {
        await axios.post('/products', formData);
      }
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product. Please check your input.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container"><div className="loading-container">Loading product details...</div></div>;

  return (
    <div className="container">
      <div className="form-card" style={{ maxWidth: '600px' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Mouse"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sku">SKU *</label>
            <input
              id="sku"
              type="text"
              value={formData.sku}
              onChange={handleChange}
              placeholder="e.g. WM-100-BLK"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="quantityOnHand">Quantity on Hand</label>
              <input
                id="quantityOnHand"
                type="number"
                min="0"
                value={formData.quantityOnHand}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lowStockThreshold">Low Stock Threshold</label>
              <input
                id="lowStockThreshold"
                type="number"
                min="0"
                value={formData.lowStockThreshold}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="costPrice">Cost Price ($)</label>
              <input
                id="costPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.costPrice}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sellingPrice">Selling Price ($)</label>
              <input
                id="sellingPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.sellingPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="error-message" style={{ marginBottom: '1.5rem' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => navigate('/products')}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={submitting}
              style={{ flex: 2 }}
            >
              {submitting ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
