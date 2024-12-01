// @ts-check
import React from 'react';

/** @param {Object} param0    權責：知道使用者點擊了什麼 tab
 * @param {import('../../model/app/content-state').TabState} param0.tab
 * @param {(param: 'all' | 'pending' | 'completed') => void} param0.onTab
 * @param {()=>void} param0.onClear
 */
export function TodoListTab({ tab, onTab, onClear }) {
  return (
    <div className="form-todoStatus">
      <div className="form-todoStatus__left">
        <button
          className={`form-todoStatus__all btn-status ${tab === 'all' && 'btn-status--on'}`}
          disabled={tab === 'all'}
          onClick={() => {
            onTab('all');
          }}
        >
          All
        </button>
        <button
          className={`form-todoStatus__pending btn-status ${tab === 'pending' && 'btn-status--on'}`}
          disabled={tab === 'pending'}
          onClick={() => {
            onTab('pending');
          }}
        >
          Pending
        </button>
        <button
          className={`form-todoStatus__complete btn-status ${tab === 'completed' && 'btn-status--on'}`}
          disabled={tab === 'completed'}
          onClick={() => {
            onTab('completed');
          }}
        >
          Completed
        </button>
      </div>
      <div className="form-todoStatus__right">
        <button
          className="form-todoStatus__clear btn-status"
          disabled={tab === 'all'}
          onClick={() => {
            if (tab === 'pending' || tab === 'completed') onClear();
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
