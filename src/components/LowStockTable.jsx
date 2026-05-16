import React from 'react';

const LowStockTable = ({ items }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem', fontWeight: '700' }}>Low Stock Alerts</h3>
      <div style={{ 
        background: 'white', 
        border: '1px solid var(--border-color)', 
        borderRadius: 'var(--radius)', 
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Product Name</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>SKU</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Qty on Hand</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Threshold</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontSize: '0.9375rem', fontWeight: '500' }}>{item.name}</td>
                  <td style={{ padding: '1rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>{item.sku}</td>
                  <td style={{ padding: '1rem', fontSize: '0.9375rem' }}>
                    <span style={{ 
                      color: 'var(--error-color)', 
                      fontWeight: '600',
                      background: '#fee2e2',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px'
                    }}>
                      {item.quantity}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>{item.lowStockThreshold}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--success-color)', fontWeight: '500' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
                  No low stock items. All good!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockTable;
