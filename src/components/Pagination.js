import Loading from './Loading';
import gsap from 'gsap';

import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../pages/store/ProductStore';
function Pagination({ changePage, pagination }) {
  const [state, dispatch] = useContext(ProductContext);

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        <li className='page-item'>
          {/* 前一頁按鈕 */}
          <a
            className={`page-link ${pagination.has_pre ? '' : 'disabled'}`}
            href='/'
            aria-label='Previous'
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page - 1, dispatch);
            }}
          >
            <span aria-hidden='true'>&laquo;</span>
          </a>
        </li>
        {/* 頁數列表 */}
        {[...new Array(pagination.total_pages)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className={`page-item`} key={`${i}_page`}>
            <a
              className={`page-link ${
                i + 1 === pagination.current_page && 'active'
              }`}
              href='/'
              onClick={(e) => {
                e.preventDefault();
                changePage(i + 1, dispatch);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className='page-item'>
          {/* 下一頁按鈕 */}
          <a
            className={`page-link ${pagination.has_next ? '' : 'disabled'}`}
            href='/'
            aria-label='Next'
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page + 1, dispatch);
            }}
          >
            <span aria-hidden='true'>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
