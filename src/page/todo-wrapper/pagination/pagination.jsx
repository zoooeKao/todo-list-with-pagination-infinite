// @ts-check
import React, { useState, useEffect } from 'react';
import './pagination.scss';

// total, limit, currentPage
/** @param {Object} param0
 * @param {import('../../../model/global-state').TodoState['total']} param0.total
 * @param {number} param0.limit
 * @param {number} param0.curPage
 * @param {(param: number) => void} param0.onPage
 */
export function Pagination({ total, limit, curPage, onPage }) {
  let lastPage = Math.ceil(total / limit);
  if (total === null || total === 0) lastPage = 1;
  const items = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="pg">
      <button
        className="pg__btn pg__previous"
        disabled={curPage === 1}
        onClick={() => curPage > 1 && onPage(curPage - 1)}
      >
        &lt;
      </button>
      <ul className="pg__ul">
        {items.map(item => (
          <li key={item} className="pg__li">
            <button className={`pg__btn ${curPage === item && 'pg__btn--on'} `} onClick={() => onPage(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="pg__btn pg__next"
        disabled={curPage === lastPage}
        onClick={() => curPage < lastPage && onPage(curPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
