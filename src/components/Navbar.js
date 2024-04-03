import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../pages/store/ProductStore';
import { handleCategory } from './Category';

function Navbar() {
  const [state, dispatch] = useContext(ProductContext);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    handleCategory(setIsLoading, state, setCategoryList);
  }, [state]);

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary sticky-top'>
        <div className='container-fluid '>
          <NavLink className='fw-bold h2 navbar-brand' to='/'>
            TravelSky
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 mx-auto navbar-nav-scroll'>
              <li className='nav-item'>
                <NavLink className='nav-link active' aria-current='page' to='/'>
                  首頁
                </NavLink>
              </li>
              <li className='nav-item  '>
                <NavLink
                  className='nav-link '
                  to='/Product'
                  // role='button'
                  // data-bs-toggle='dropdown'
                  // aria-expanded='false'
                >
                  熱門旅遊行程
                </NavLink>
                {/* <ul
                  className='dropdown-menu ps-0'
                  style={{ textAlign: 'center' }}
                >
                  <li>
                    <NavLink className='dropdown-item' to='/product'>
                      所有產品
                    </NavLink>
                  </li>
                  {categoryList.map((item) => {
                    return (
                      <li key={item}>
                        <NavLink
                          className='dropdown-item'
                          to={`/product/${item}`}
                        >
                          {item}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul> */}
              </li>
              {/* <li>
                <form
                  className='d-flex position-absolute '
                  style={{ right: '100px', top: '10px' }}
                  role='search'
                >
                  <input
                    className='form-control me-2'
                    type='text'
                    placeholder='搜尋前往城市'
                    aria-label='Search'
                    value={keyword}
                    onChange={handleChange}
                    onKeyDown={getSearch}
                  />
                  <button
                    className='btn btn-outline-success me-3 '
                    type='submit'
                  >
                    <i className='bi bi-search'></i>
                  </button>
                </form>
              </li> */}
              {/* <li>
                <NavLink
                  to='login'
                  className='nav-item position-absolute'
                  style={{ right: '100px', top: '20px' }}
                >
                  管理員登入
                </NavLink>
              </li> */}
            </ul>
            <div
              className='d-flex me-5 position-absolute '
              style={{ right: '10px', top: '20px' }}
            >
              <NavLink to='/cart' className='nav-link position-relative'>
                <i className='bi bi-cart'></i>
                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                  {state?.carts?.carts?.length}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
