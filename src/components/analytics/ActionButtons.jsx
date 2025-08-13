import React from 'react';

/**
 * onDownload: fn that returns a promise resolving to the file blob
 * onUpdate:  fn to re‑fetch your analytics data
 */
export function ActionButtons({ onDownload, onUpdate }) {
  return (
    <div className="action-buttons">
      <button
        onClick={onDownload}
        className="action-button icon"
      >
        <span className="icon">⬇️</span>
        Download Report
      </button>
      <button
        onClick={onUpdate}
        className="action-button icon"
      >
        <span className="icon">🔄</span>
        Update Data
      </button>
    </div>
  );
}
