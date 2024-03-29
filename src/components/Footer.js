import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className='footer bg-primary ' style={{ zIndex: 999 }}>
      <div className='text-white py-4'>
        <ul className='d-flex justify-content-center fs-4'>
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
        </ul>
        <p className='mt-3 text-center'>
          2024 / 本網站僅供練習，非實際商業用途
        </p>
      </div>
    </div>
  );
}
export default Footer;
