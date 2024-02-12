import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
function Search() {
  const [products, setProducts] = useState([]);
  const [search] = useSearchParams();
  const keyword = search.get('keyword');
  const [isLoading, setIsLoading] = useState(true);

  const getSearchProduct = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products`
    );
    const result = res.data.products.filter((item) =>
      item.title.includes(keyword)
    );
    setProducts(result);
    setIsLoading(false);
  };
  useEffect(() => {
    getSearchProduct();
  }, [keyword]);
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-10 col-md-9'>
            <h2 className='text-start text-primary mb-1 mt-6 fw-bold'>
              {keyword} 的搜尋結果
            </h2>{' '}
            {!products.length && (
              <h4 className='mb-6 '>
                很抱歉，無「{keyword}」相關資料。請使用其他的關鍵字再試一次。
              </h4>
            )}
            {isLoading ? (
              <Loading isLoading={isLoading} />
            ) : (
              <div className='container p-3'>
                <div className='row'>
                  {products.map((product) => {
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
                            // height='70rem'
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
                                NTD {Math.round(product.price).toLocaleString()}
                              </h4>
                              <span className='bg-secondary badge  text-align py-1 '>
                                <i className='bi bi-tag-fill'></i>{' '}
                                {product.category}
                              </span>
                              <h6 className='text-primary align-center mt-3'>
                                {product.origin_price} 人前往
                              </h6>

                              {/* <button
                          type='button'
                          className='btn btn-primary text-white'
                          style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                          }}
                        >
                          了解更多
                        </button> */}
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* <Pagination changePage={getProduct} pagination={state.page} /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Search;
