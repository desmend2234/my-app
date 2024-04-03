import gsap from 'gsap';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { ProductContext } from '../store/ProductStore';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { getProduct, getAllProduct } from '../store/ProductStore';

function ProductIndex() {
  const [state, dispatch] = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tempPic, setTempPic] = useState([]);

  useEffect(() => {
    getAllProduct(dispatch);
    getProduct(1, dispatch);
  }, []);
  const getMainPic = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product`
      );
      console.log(res);
      const productData = res?.data?.product;
      let filterImage = productData?.imagesUrl?.filter((item) => {
        return item !== '';
      });
      const combinedArray = [productData.imageUrl, ...filterImage];
      setTempPic(combinedArray);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    getMainPic();
  }, []);
  useEffect(() => {
    // 假設首頁加載完成後需要做一些異步操作，這裡使用setTimeout模擬
    const timer = setTimeout(() => {
      setIsLoading(false); // 加載完成後將isLoading設為false
    }, 1000); // 假設加載完成 時間為1秒

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const loading = () => {
      gsap.fromTo(
        '.card',
        { autoAlpha: 0 },
        { autoAlpha: 1, y: 10, duration: 0.6 }
      );
    };
    loading();
  }, []);
  return (
    <>
      <h2 className='text-start text-primary mb-1 fw-bold'>熱門城市</h2>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div className='container p-3'>
          <div className='row'>
            {state.product.map((product) => {
              return (
                <div className='col-lg-4 col-md-12' key={product.id}>
                  <div
                    className='card img-wrapper mb-4 w-100'
                    style={{ border: 'none' }}
                  >
                    <img
                      src={product.imageUrl}
                      className='card-img-top'
                      alt='...'
                      loading='lazy'
                    />
                    <Link to={`/productDetail/${product.id}`}>
                      <div className='card-body'>
                        <h4
                          className='text-dark stretched-link fs-5 fw-bold'
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {product.title}
                        </h4>
                        <h4 className='text-dark product-price'>
                          NTD {Math.round(product.price).toLocaleString()}
                        </h4>
                        <span className='bg-secondary badge  text-align py-1 '>
                          <i className='bi bi-tag-fill'></i> {product.category}
                        </span>
                        <h6 className='text-primary align-center mt-3'>
                          {product.origin_price} 人前往
                        </h6>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination changePage={getProduct} pagination={state.page} />
        </div>
      )}
    </>
  );
}

export default ProductIndex;
