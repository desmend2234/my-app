import { Link, useOutletContext, useParams } from 'react-router-dom';
import Image from 'react-graceful-image';
import axios from 'axios';
import { useEffect } from 'react';
function Product() {
  const { products } = useOutletContext();
  const { cartData } = useOutletContext();
  // const { id } = useParams();
  // const addCart = async (id) => {
  //   try {
  //     const res = await axios.post(
  //       `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
  //       {
  //         data: {
  //           product_id: id,
  //           qty: 1,
  //         },
  //       }
  //     );
  //     console.log(res);
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   addCart(id);
  // }, [id]);
  return (
    <>
      {products?.map((item) => {
        return (
          <div className='col-lg-4 col-6 mb-4'>
            <div
              className='card border-0 mb-4 position-relative h-100 '
              key={item.id}
            >
              <div className='card img-wrapper w-100'>
                <img
                  src={item.imageUrl}
                  className='card-img-top'
                  alt='...'
                  loading='lazy'
                />
                <div className='card-body'>
                  <Link
                    className='text-dark stretched-link fs-5'
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
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
                      bottom: '5rem',
                      right: '1rem',
                    }}
                  >
                    NTD {item.origin_price}
                  </h4>
                  <br />
                  <span className='bg-secondary badge text-dark text-align py-1 '>
                    <i className='bi bi-tag-fill'></i> {item.category}
                  </span>
                  <h6 className='text-primary align-center mt-3'>250人前往</h6>
                  <button
                    type='button'
                    className='btn btn-primary text-white '
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                    }}
                  >
                    了解更多
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Product;
