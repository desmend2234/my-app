import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../store/ProductStore';
import Loading from '../../components/Loading';
import { handleCategory } from '../../components/Category';

function ProductLayout() {
  const [categoryList, setCategoryList] = useState([]);
  const [state, dispatch] = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 在 useEffect 中呼叫 handleCategory，並接收返回的函數
    const unsubscribe = handleCategory(setIsLoading, state, setCategoryList);
  }, [state]);
  return (
    <div className='container mt-7 mb-5' style={{}}>
      <div className='row'>
        <div
          className='col-lg-2 col-md-3 mb-md-0 mb-4  d-md-block '
          key={state.product.id}
        >
          <ul
            className='list-group  text-center mt-5 '
            style={{ borderRadius: '10px' }}
          >
            {/* 將左側類表渲染 */}
            <Link to={'/product'}>
              <li
                className='list-group-item list-effect'
                style={{ border: 'gray solid 1px' }}
              >
                全部商品
              </li>
            </Link>
            {categoryList.map((item) => {
              return (
                <Link to={item} key={item}>
                  <li
                    className='list-group-item list-effect  '
                    style={{ border: 'gray solid 1px' }}
                  >
                    {item}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        {/* 右側產品頁面 */}
        <div className='col-lg-10 col-md-9'>
          <div className='row'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductLayout;
