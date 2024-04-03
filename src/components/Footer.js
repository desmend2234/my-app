import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className='footer bg-primary ' style={{ zIndex: 999 }}>
      <div className='text-white py-4 row d-flex'>
        <div className='col-md-6 justify-content-center d-flex'>
          <h3>聯繫我們</h3>
          <ul>
            <li>網站練習公司</li>
            <li>地址：123 Main St,123 City, Country</li>
            <li>電話：+123-456-7890</li>
            <li>Email：info@example.com</li>
          </ul>
        </div>
        <div className='col-md-6'>
          <ul className='d-flex  fs-4 justify-content-center'>
            <li>
              <Link to='' className='text-white mx-3'>
                <i className='bi bi-linkedin'></i>
              </Link>
            </li>
            <li>
              <Link to='' className='text-white mx-3'>
                <i className='bi bi-github'></i>
              </Link>
            </li>
            <li>
              <Link to='' className='text-white mx-3'>
                <i className='bi bi-facebook'></i>
              </Link>
            </li>

            <Link to='login' className='text-black mx-3 '>
              管理員登入
            </Link>
          </ul>
          <p className='mt-3 text-center'>
            <p>版權所有 &copy; 2024 本網站僅做練習，非商業用途</p>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
