import { Link, NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <>
      <i className='bi bi-cart'>99</i>
      <nav className='navbar navbar-expand-lg bg-body-tertiary fixed-top mb-5'>
        <div className='container-fluid '>
          <a className='navbar-brand' href='#'>
            GoTraveler
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className='nav-link active' aria-current='page' to='/'>
                  首頁
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/findPlace'>
                  去哪玩
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <Link
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Dropdown
                </Link>
                <ul className='dropdown-menu'>
                  <li>
                    <Link className='dropdown-item' href='#'>
                      Action
                    </Link>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className='d-flex' role='search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <button className='btn btn-outline-success me-3' type='submit'>
                Search
              </button>
            </form>
            <div className='d-flex me-5'>
              <NavLink to='/cart' className='nav-link position-relative'>
                <i className='bi bi-cart'></i>
                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                  99
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
