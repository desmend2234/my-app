import { Link, useOutletContext } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useState } from 'react';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const { products } = useOutletContext();
  return (
    <>
      <div id='carouselExampleDark' className='carousel carousel-dark slide'>
        <Loading isLoading={isLoading} />
        <div className='carousel-indicators'>
          <button
            type='button'
            data-bs-target='#carouselExampleDark'
            data-bs-slide-to='0'
            className='active'
            aria-current='true'
            aria-label='Slide 1'
          ></button>
          <button
            type='button'
            data-bs-target='#carouselExampleDark'
            data-bs-slide-to='1'
            aria-label='Slide 2'
          ></button>
          <button
            type='button'
            data-bs-target='#carouselExampleDark'
            data-bs-slide-to='2'
            aria-label='Slide 3'
          ></button>
        </div>
        <div className='carousel-inner'>
          <div className='carousel-item active ' data-bs-interval='10000'>
            <img
              src='https://images.unsplash.com/photo-1553603227-2358aabe821e?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              className='d-block w-100 object-cover'
              height='636px'
              alt='...'
              loading='lazy'
            />

            <div className='carousel-caption d-none d-md-block heading mb-5'>
              <Link>
                <h2 className='text-primary'>Go! Traveler</h2>
                <h5>Get started</h5>
              </Link>
            </div>
          </div>
          <div className='carousel-item' data-bs-interval='2000'>
            <img
              src='https://images.unsplash.com/photo-1553603227-2358aabe821e?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              className='d-block w-100'
              alt='...'
            />
            <div className='carousel-caption d-none d-md-block'>
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className='carousel-item'>
            <img
              src='https://images.unsplash.com/photo-1553603227-2358aabe821e?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              className='d-block w-100'
              alt='...'
            />
            <div className='carousel-caption d-none d-md-block'>
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target='#carouselExampleDark'
          data-bs-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target='#carouselExampleDark'
          data-bs-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
      <div className='p-3 d-flex justify-content-center'>
        <h3>大家都在看</h3>
      </div>
      <div className='container p-3'>
        <div className='row'>
          {products.map((product) => {
            return (
              <div className='col-4' key={product.id}>
                <div className='card img-wrapper mb-4 w-100'>
                  <img
                    src={product.imageUrl}
                    className='card-img-top'
                    alt='...'
                    loading='lazy'
                  />

                  <div className='card-body'>
                    <h4
                      className='text-dark'
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
                        bottom: '5rem',
                        right: '1rem',
                      }}
                    >
                      NTD {product.origin_price}
                    </h4>
                    <span className='bg-secondary badge text-dark text-align py-1 '>
                      <i className='bi bi-tag-fill'></i> {product.category}
                    </span>
                    <h6 className='text-primary align-center mt-3'>
                      {product.price} 人前往
                    </h6>
                    <button
                      type='button'
                      className='btn btn-primary text-white'
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
            );
          })}
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            旅遊是一場啟發心靈的冒險，為生活灑下豐富的色彩。透過走遍山川河流，品嚐異國美食，我們拓寬了視野，豐富了思維。旅途中的文化交流和當地人的相遇成為難忘的記憶，彷彿在世界的大舞台上演繹自己的故事。旅行是對不同風土人情的體悟，是學習和成長的機會。每一趟旅程都是一本教科書，教導我們尊重、包容、感恩，並為生活注入無盡的動力，使我們的人生更加豐富而有深度。
          </div>
          <div className='col-6 mb-4 mt-3'>
            <img
              className='w-100'
              src='https://images.unsplash.com/photo-1590066861418-0a396745eca0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
