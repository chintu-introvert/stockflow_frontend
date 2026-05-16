import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({ defaultLowStockThreshold: 5 });
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const [productsRes, settingsRes] = await Promise.all([
        axios.get('/products'),
        axios.get('/settings')
      ]);
      setProducts(productsRes.data);
      
      const threshold = settingsRes.data.defaultLowStockThreshold ?? settingsRes.data;
      if (threshold !== undefined) {
        setSettings({ defaultLowStockThreshold: Number(threshold) });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete product.');
      }
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isLowStock = (product) => {
    const threshold = product.lowStockThreshold ?? settings.defaultLowStockThreshold;
    return product.quantityOnHand <= threshold;
  };

  if (loading) return <div className="container"><div className="loading-container">Loading products...</div></div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <button onClick={() => navigate('/products/new')} className="btn-primary btn-add">
          + Add Product
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Selling Price</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td style={{ fontWeight: '600' }}>{product.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{product.sku}</td>
                  <td>{product.quantityOnHand}</td>
                  <td>
                    {isLowStock(product) ? (
                      <span className="badge badge-danger">Low Stock</span>
                    ) : (
                      <span className="badge badge-success">In Stock</span>
                    )}
                  </td>
                  <td style={{ fontWeight: '600' }}>${Number(product.sellingPrice || 0).toFixed(2)}</td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => navigate(`/products/${product.id}`)} 
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)} 
                        className="btn-icon btn-delete"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  {searchTerm ? 'No products match your search.' : 'No products found. Start by adding one!'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
