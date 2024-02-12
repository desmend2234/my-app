import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../pages/store/ProductStore';
import { handleCategory } from './Category';
import Loading from './Loading';
import gsap from 'gsap';
import Search from '../pages/front/Search';
function Navbar() {
  const [state, dispatch] = useContext(ProductContext);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    // 在 useEffect 中呼叫 handleCategory，並接收返回的函數
    handleCategory(setIsLoading, state, setCategoryList);
  }, [state]);
  console.log(categoryList);
  const getSearch = (e) => {
    if (e.key === 'Enter') {
      setKeyword(e.target.value);
      setSearch(keyword);
      navigate(`/search?keyword=${e.target.value}`);
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
  // const handleChange = (e) => {
  //   const result = state?.productAll?.data?.products?.filter((item) => {
  //     if (e.target.value === '') return item;
  //     return item.title.includes(e.target.value);
  //   });
  //   console.log(result);
  //   setSearch({ query: e.target.value, value: result });
  // };
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary   sticky-top'>
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
              <li className='nav-item dropdown '>
                <NavLink
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  產品一覽
                </NavLink>
                <ul
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
                </ul>
              </li>
              <li>
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
              </li>
              <li>
                <NavLink
                  to='login'
                  className='d-flex me-5 position-absolute '
                  style={{ right: '450px', top: '20px' }}
                >
                  管理員登入
                </NavLink>
              </li>
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
