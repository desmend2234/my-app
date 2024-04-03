import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactFullpage from '@fullpage/react-fullpage';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../store/ProductStore';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNavButtons } from '../../components/SwiperNavButtons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getAllProduct } from '../store/ProductStore';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useContext(ProductContext);
  AOS.init();

  useEffect(() => {
    getAllProduct(dispatch);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // 加載完成後將isLoading設為false
    }, 1000); // 假設加載完成時間為1秒

    // 清除定時器
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loading = () => {
      gsap.fromTo(
        '.upper h2',
        { autoAlpha: 0 },
        { autoAlpha: 1, y: 10, duration: 1 }
      );
      gsap.fromTo(
        '.upper p',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8, delay: 0.4 }
      );
      gsap.fromTo(
        '.btn1',
        { autoAlpha: 0, x: -20 },
        { autoAlpha: 1, x: 0, duration: 0.8, delay: 0.8 }
      );
      gsap.fromTo(
        '.btn2',
        { autoAlpha: 0, x: 20 },
        { autoAlpha: 1, x: 0, duration: 0.8, delay: 0.8 }
      );
      gsap.fromTo(
        '.arrow',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8, delay: 1.2 }
      );
    };
    if (!isLoading) {
      loading();
    }
  }, [isLoading]);

  const handleLeave = () => {
    const loading2 = () => {
      gsap.fromTo(
        '.upper ',
        { autoAlpha: 0, y: 0 },
        { autoAlpha: 1, y: 10, duration: 1.5 }
      );
      gsap.fromTo(
        '.lower ',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.3, delay: 0.6 }
      );
      gsap.fromTo(
        '.prompt-text',
        { autoAlpha: 0, x: -50 },
        { autoAlpha: 1, x: 0, duration: 1 }
      );
    };
    console.log('handleLeave');
    loading2();
  };
  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          <ReactFullpage
            licenseKey={'YOUR_KEY_HERE'}
            scrollingSpeed={1000}
            onLeave={handleLeave}
            render={() => (
              <div id='fullpage'>
                <section className='section' id='slide1'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='upper text-center'>
                          <h2>透過TravelSky訂購行程，前往令人心曠神怡的國度</h2>
                          <p className='mt-2'>威尼斯,義大利</p>
                        </div>
                        <div className='lower text-center pb-5'>
                          <div>
                            <Link
                              className='btn1'
                              to='/productDetail/-NpnOBrW6dnEok0KOMTl'
                            >
                              立即訂購
                            </Link>
                            <Link className='btn2' to='product'>
                              查看更多
                            </Link>
                          </div>
                          <div>
                            <Link className='arrow'>
                              <i
                                className='bi bi-chevron-double-down'
                                style={{ color: 'wheat' }}
                              ></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className='section' id='slide2'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='upper text-center'>
                          <h2>展開一段前所未有的旅程</h2>
                          <p className='mt-2'>雪梨,澳洲</p>
                        </div>
                        <div className='lower text-center pb-5'>
                          <div>
                            <Link
                              className='btn1'
                              to='productDetail/-NpnR1H-T5S9pABr-Db7'
                            >
                              前往訂購
                            </Link>
                            <Link className='btn2' to='product'>
                              查看更多
                            </Link>
                          </div>
                          <div>
                            <Link className='arrow'>
                              <i
                                className='bi bi-chevron-double-down'
                                style={{ color: 'wheat' }}
                              ></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className='section' id='slide3'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='upper text-center'>
                          <h2>創造屬於自己的璀璨回憶</h2>
                          <p className='mt-2'>米蘭,義大利</p>
                        </div>
                        <div className='lower text-center pb-5'>
                          <div>
                            <Link
                              className='btn1'
                              to='productDetail/-NpnQ7X6H7XRKcXRRC85'
                            >
                              立即訂購
                            </Link>
                            <Link className='btn2' to='product'>
                              查看更多
                            </Link>
                          </div>
                          <div>
                            <Link className='arrow'>
                              <i
                                className='bi bi-chevron-double-down'
                                style={{ color: 'wheat' }}
                              ></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className='section'>
                  <div className='container '>
                    <div
                      className='row align-items-center mt-sm-3 mt-md-4 mb-2 mb-md-3 mb-lg-4'
                      data-disable-parallax-down='md'
                    >
                      <div className='col-md-6 col-lg-5 order-md-2 prompt-pic'>
                        <img
                          src='https://plus.unsplash.com/premium_photo-1663957921642-de7cbeb9d1e4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                          alt=''
                          width='auto'
                          loading='lazy'
                          style={{ height: '55vmin', borderRadius: '10px' }}
                        />
                      </div>
                      <div
                        className='col-md-6 col-lg-7 order-md-1 mt-md-n5'
                        data-disable-parallax-down='md'
                      >
                        <h2 className='mb-1 mt-5 prompt-text'>
                          體驗獨家旅遊行程
                        </h2>
                        <p className='fs-lg mb-0 mb-lg-1 prompt-text'>
                          探索全球絕美風景，品嚐異國美食，開啟一場驚險刺激的冒險之旅！盡情享受奢華度假和文化體驗，讓您的旅行充滿難忘回憶！
                        </p>
                        <Swiper
                          modules={[Navigation, Pagination]}
                          spaceBetween={10}
                          slidesPerView={1}
                          loop={true}
                        >
                          {state?.productAll?.map((slide) => {
                            return (
                              <SwiperSlide key={slide.id}>
                                <div className='carousel-pic'>
                                  <Link to={`/productDetail/${slide.id}`}>
                                    <img
                                      src={slide.imageUrl}
                                      alt='slideImage'
                                      style={{ borderRadius: '10px' }}
                                      loading='lazy'
                                    />
                                    <div
                                      className='position-absolute '
                                      style={{
                                        right: '108px',
                                        top: '16px',
                                        color: 'white',
                                        fontWeight: 'bolder',
                                        backgroundColor: 'rgba(0,0,0,.3)',
                                        padding: '0.5rem',
                                        borderRadius: '10px',
                                      }}
                                    >
                                      <h4 className='mb-0'>{slide.title}</h4>
                                    </div>
                                  </Link>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                          <SwiperNavButtons />
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          />
        </>
      )}
    </>
  );
}
export default Home;
