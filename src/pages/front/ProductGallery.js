import gsap from 'gsap';

import { Link, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../store/ProductStore';
import ProductDetail from './ProductDetail';
import Loading from '../../components/Loading';

function ProductGallery() {
  const { categories: currentCategory } = useParams();
  const [state, dispatch] = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loading = () => {
      gsap.fromTo(
        '.card',
        { autoAlpha: 0 },
        { autoAlpha: 1, y: 10, duration: 0.6 }
      );
    };
    loading();
  }, [isLoading]);
  return (
    <>
      {state.product.map((item) => {
        if (item.category === currentCategory) {
          return (
            <div className='d-flex col-lg-4 col-md-9 ' key={item.id}>
              <Loading isLoading={isLoading} />
              <div className='card border-0 mb-4 position-relative h-100 '>
                <div
                  className='card img-wrapper w-100'
                  style={{ border: 'none' }}
                >
                  <img
                    src={item.imageUrl}
                    className='card-img-top'
                    alt='...'
                    loading='lazy'
                  />
                  <div className='card-body '>
                    <Link
                      className='text-dark stretched-link fs-5 fw-bold'
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      to={`/productDetail/${item.id}`}
                    >
                      {item.title}
                    </Link>
                    <h4
                      className='text-dark'
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        position: 'absolute',
                        bottom: '3rem',
                        right: '1rem',
                      }}
                    >
                      NTD {Math.round(item.price).toLocaleString()}
                    </h4>
                    <br />
                    <span className='bg-secondary badge text-dark text-align py-1 '>
                      <i className='bi bi-tag-fill'></i> {item.category}
                    </span>
                    <h6 className='text-primary align-center mt-3'>
                      {item.origin_price}人前往
                    </h6>
                    <Link to={`/productDetail/${item.id}`}>
                      {/* <button
                        type='button'
                        className='btn btn-primary text-white '
                        style={{
                          position: 'absolute',
                          bottom: '1rem',
                          right: '1rem',
                        }}
                      >
                        了解更多
                      </button> */}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
export default ProductGallery;
