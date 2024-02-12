import axios from 'axios';
import gsap from 'gsap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ProductContext } from '../store/ProductStore';
import { useContext } from 'react';
import Loading from '../../components/Loading';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ProductDetail() {
  const [state, dispatch] = useContext(ProductContext);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [tempPic, setTempPic] = useState([]);
  const [productItem, setProductItem] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const { id } = useParams();
  const [cartData, setCartData] = useState();
  const { getCart } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  const getProductItem = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );
      console.log(res.data.product);
      setProductItem(res.data.product);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const addCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        {
          data: {
            product_id: productItem.id,
            qty: cartQuantity,
          },
        }
      );
      setIsLoading(false);
      dispatch({ type: 'ADD_TO_CART', payload: [res.data.data.product] });
    } catch (error) {
      console.log(error);
    }
  };

  const getMainPic = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );
      const productData = res.data.product;
      let filterImage = productData.imagesUrl.filter((item) => {
        return item !== '';
      });
      const combinedArray = [productData.imageUrl, ...filterImage];
      setTempPic(combinedArray);
      // setMainPic(productData.imageUrl);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getProductItem(id);
  }, [id]);
  useLayoutEffect(() => {
    getMainPic(id);
  }, [id]);

  useEffect(() => {
    const loading = () => {
      gsap.fromTo(
        '.product-img',
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, duration: 1 }
      );
    };
    gsap.fromTo(
      '.product-detail',
      { autoAlpha: 0, x: 10 },
      { autoAlpha: 1, x: 0, duration: 0.8, delay: 0.8 }
    );
    loading();
  }, [isLoading]);

  const datePicker = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  // 從本地存儲加載先前選取的日期，如果沒有則使用預設值
  const savedDate = localStorage.getItem(`selectedDate_${id}`);
  const [selectedDate, setSelectedDate] = useState(
    savedDate ? new Date(savedDate) : new Date()
  );
  // 更新選取的日期並將其存儲在本地存儲中
  const handleDateChange = (dates, id) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    localStorage.removeItem(`selectedStartDate_${id}`);
    localStorage.removeItem(`selectedEndDate_${id}`);
    localStorage.setItem(`selectedStartDate_${id}`, start);
    localStorage.setItem(`selectedEndDate_${id}`, end);
  };

  return (
    <div>
      <Loading isLoading={isLoading} />
      <div className='container box-property'>
        <div className='row'>
          <div
            className='col-lg-8 pe-6 col-md-7 mt-6 mb-md-2 order-sm-last order-lg-first order-md-first'
            style={{ border: 'none' }}
          >
            <div className='row flex-column'>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation, EffectFade]}
                className='mySwiper'
                effect='fade'
              >
                {tempPic?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Product ${index}`}
                      className='img-fluid object-cover'
                      style={{ height: '56dvmin' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div>
              <h5 style={{ whiteSpace: 'pre-line' }} className='mb-3 mt-3'>
                {productItem.content}
              </h5>
            </div>
          </div>
          <div
            className='col-lg-4 col-md-5 mt-6 mb-6 product-detail order-sm-first order-lg-last order-md-last'
            key={productItem.id}
          >
            <h3 className='fw-bold'>{productItem.title}</h3>
            <h2 style={{ color: '#c16e70' }}>
              NTD {Math.round(productItem.price).toLocaleString()}
            </h2>{' '}
            <p style={{ color: '#dc9e82' }}>
              已有{productItem.origin_price}人參加
            </p>
            <hr />
            <div>
              <p>{productItem.description}</p>
            </div>
            <div>
              <h5 className='fw-bold'>選擇日期</h5>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date, id)}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 5)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                showDisabledMonthNavigation
              />
            </div>
            <div className='row mb-3 align-items-center justify-content-between mt-6'>
              <div className='col-lg-4 col-md-4'>
                <label>數量</label>
              </div>
              <div className='col-lg-8 col-md-4'>
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
              href=''
              className='btn btn-primary w-100 py-2 mb-4'
              aria-label='Add to cart'
              onClick={() => addCart()}
            >
              加入行程
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
