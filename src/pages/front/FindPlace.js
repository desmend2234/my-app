import { Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import Product from '../../components/Product';
function FindPlace() {
  return (
    <div className='container mt-7 mb-5'>
      <div className='row'>
        <div className='col-lg-2 col-md-3 mb-md-0 mb-4  d-md-block d-none'>
          <ul className='list-group list-group-flush text-center '>
            <Link>
              <li className='list-group-item list-effect'>東北亞</li>
            </Link>
            <li className='list-group-item list-effect'>東南亞</li>
            <li className='list-group-item list-effect'>歐洲</li>
            <li className='list-group-item list-effect'>北美洲</li>
            <li className='list-group-item list-effect'>澳洲</li>
          </ul>
        </div>
        <div className='col-lg-10 col-md-9'>
          <h2 className='text-center text-primary mb-4'>熱門景點</h2>
          <div className='row'>
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindPlace;
