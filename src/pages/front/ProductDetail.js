import { useState, useRef } from 'react';
import SwiperGallery from '../../components/SwiperGallery';
function ProductDetail() {
  const [cartQuantity, setCartQuantity] = useState(1);

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-7 mt-6' style={{ height: '1000px' }}>
            <item>
              <img
                src='https://images.unsplash.com/photo-1540998263728-032f59903a86?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='w-100 h-50 object-cover'
              />
            </item>
          </div>
          <div className='col-5 mt-6 px-5'>
            <h3>title</h3>
            <p className='text-muted'>
              <small>title</small>
            </p>
            <h2 style={{ color: '#c16e70' }}>NTD29999</h2>{' '}
            <p style={{ color: '#dc9e82' }}>已有255人參加</p>
            <hr />
            <div className='row mb-3 align-items-center justify-content-between'>
              <div className='col-lg-5 col-md-4'>
                <label>數量</label>
              </div>
              <div className='col-lg-6 col-md-4'>
                <div className='input-group border border-secondary '>
                  <div className='input-group-prepend'>
                    <button
                      className='btn btn-outline-primary rounded-0 border-0 py-2'
                      type='button'
                      id='button-addon1'
                      onClick={() =>
                        setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                      }
                      aria-label='Minus'
                    >
                      <i className='bi bi-dash'></i>
                    </button>
                  </div>
                  <input
                    type='number'
                    className='form-control border-0 text-center my-auto shadow-none'
                    placeholder=''
                    aria-label='Example text with button addon'
                    aria-describedby='button-addon1'
                    value={cartQuantity}
                    readOnly
                  />
                  <div className='input-group-append'>
                    <button
                      className='btn btn-outline-primary rounded-0 border-0 py-2'
                      type='button'
                      id='button-addon2'
                      onClick={() => setCartQuantity((pre) => pre + 1)}
                      aria-label='Plus'
                    >
                      <i className='bi bi-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type='button'
              href='./checkout.html'
              class='btn btn-primary w-100 py-2 mb-4'
              aria-label='Add to cart'
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
      <SwiperGallery></SwiperGallery>
    </div>
  );
}

export default ProductDetail;
