import React from 'react';

const LowStockTable = () => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Low Stock Alerts</h3>
      <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Product</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Stock Level</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Threshold</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No low stock items detected.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockTable;
