import { useForm } from 'react-hook-form';
import { ProductContext } from '../store/ProductStore';
import { useContext, useEffect, useState } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { Input, Select, CheckboxRadio } from '../../components/FormElement';
import axios from 'axios';
import Loading from '../../components/Loading';

function CheckOut() {
  const [state, dispatch] = useContext(ProductContext);
  const [mapData, setMapData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });
  const totalAmount = Array.isArray(state?.carts?.carts)
    ? state?.carts?.carts.reduce(
        (total, item) => total + item.product?.price * item.qty,
        0
      )
    : 0;
  const onSubmit = async (data) => {
    const { name, email, tel, address } = data;
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
      },
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );
      console.log(res);
      navigate(`/success/${res.data.orderId}`);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //讀取全台縣市鄉鎮資料
  const mapDataUrl = `https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/AllData.json`;

  const getMapData = async () => {
    try {
      const res = await axios.get(mapDataUrl);
      setMapData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //判斷鄉鎮資料
  const handleCityChange = (e) => {
    const selectedCityValue = e.target.value;
    setSelectedCity(selectedCityValue);

    //找到選擇的縣市鄉鎮資料
    const selectedCityData = mapData.find(
      (item) => item.CityName === selectedCityValue
    );
    //將鄉鎮資料儲存成陣列格式
    const districtOptions = selectedCityData
      ? selectedCityData.AreaList.map((area) => area.AreaName)
      : [];
    setDistrictOptions(districtOptions);
  };

  useEffect(() => {
    getMapData();
  }, []);
  return (
    <div className='pt-5 pb-7'>
      {/* <Loading isLoading={isLoading} /> */}
      <div className='container'>
        {/* <CheckoutSteps
          data={[
            { step: 1, content: '購物車', done: true },
            { step: 2, content: '填寫資料', done: true },
            { step: 3, content: '完成訂購', done: false },
          ]}
        /> */}
        <div className='row justify-content-center flex-md-row flex-column-reverse'>
          <div className='col-lg-6 col-md-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='p-4'>
              <form>
                <h5>顧客資料</h5>
                <div className='mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='name'
                    type='text'
                    labelText='姓名*'
                    placeholder=''
                    rules={{
                      required: '使用者名稱為必填',
                      maxLength: {
                        value: 10,
                        message: '使用者名稱長度不超過 10',
                      },
                    }}
                  />
                </div>
                <div className='mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='email'
                    type='email'
                    labelText='Email*'
                    rules={{
                      required: {
                        value: true,
                        message: 'Email 為必填',
                      },
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: '信箱格式錯誤，需有@與.等符號',
                      },
                    }}
                  />
                </div>
                <div className='mb-5'>
                  <Input
                    register={register}
                    errors={errors}
                    id='tel'
                    type='tel'
                    labelText='手機*'
                    rules={{
                      // value: true,
                      required: '手機為必填',

                      minLength: {
                        value: 6,
                        message: '手機不少於 6 碼',
                      },
                      maxLength: {
                        value: 12,
                        message: '手機不少於 12 碼',
                      },
                      pattern: {
                        value: /09\d{2}(\d{6}|-\d{3}-\d{3})/,
                        message: '需符合手機格式',
                      },
                    }}
                  />
                </div>
                <h5>送貨與付款資料</h5>
                <div className='row mb-3 g-3'>
                  <div className='col-6'>
                    <Select
                      register={register}
                      errors={errors}
                      labelText='縣市*'
                      id='city'
                      onChange={(e) => handleCityChange(e)}
                      // defaultValue='請選擇'
                      rules={{
                        required: { value: true, message: '縣市為必填' },
                      }}
                      disabled={false}
                    >
                      <option value=''>請選擇縣市</option>
                      {mapData?.map((city) => (
                        <option value={city.CityName} key={city.CityName}>
                          {city.CityName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className='col-6'>
                    <Select
                      register={register}
                      errors={errors}
                      labelText='鄉鎮市區*'
                      id='district'
                      rules={{
                        required: { value: true, message: '鄉鎮市區為必填' },
                      }}
                      disabled={false}

                      //   disabled={!getValues().city}
                    >
                      <option value='' disabled>
                        請選擇鄉鎮市區
                      </option>
                      {districtOptions?.map((area) => (
                        <option value={area} key={area}>
                          {area}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className='mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='address'
                    type='text'
                    labelText='地址*'
                    rules={{
                      required: {
                        value: true,
                        message: '地址為必填',
                      },
                    }}
                  />
                </div>
                <div className='mb-5'>
                  <div className='form-label'>付款方式</div>
                  <CheckboxRadio
                    register={register}
                    errors={errors}
                    type='radio'
                    name='payment'
                    id='creditCard'
                    value='creditCard'
                    rules={{
                      required: {
                        value: true,
                        message: '請選擇付款方式',
                      },
                    }}
                    labelText='信用卡 (支援VISA, MasterCard, JCB)'
                    hasErrorMsg={false}
                  />
                  <CheckboxRadio
                    register={register}
                    errors={errors}
                    type='radio'
                    name='payment'
                    id='atm'
                    value='atm'
                    rules={{
                      required: {
                        value: true,
                        message: '請選擇付款方式',
                      },
                    }}
                    labelText='銀行轉帳／ATM'
                    hasErrorMsg={true}
                  />
                </div>
                <div className='mb-3'>
                  <h5>訂單備註</h5>
                  <textarea
                    className='form-control'
                    rows='3'
                    placeholder='有什麼資訊想備註給店家嗎?'
                  ></textarea>
                </div>
                <div className='mb-5'>
                  <CheckboxRadio
                    register={register}
                    errors={errors}
                    type='checkbox'
                    name='isSubscribed'
                    id='checkbox'
                    rules=''
                    labelText='我想收到最新資訊及優惠方案'
                    hasErrorMsg={false}
                  />
                </div>
                <div className='d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100'>
                  <Link
                    to='/cart'
                    className='text-dark mt-md-0 mt-3'
                    aria-label='Back to Cart'
                  >
                    <i className='bi bi-chevron-left me-2'></i>
                    返回購物車
                  </Link>
                  <button
                    type='submit'
                    className='btn btn-primary py-3 px-7'
                    // disabled={disableSubmit}
                    style={{
                      pointerEvents: 'auto',
                    }}
                    aria-label='Submit'
                  >
                    確認送出
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='col-lg-4 col-md-5'>
            <div
              className=' border p-4 mb-4'
              style={{ backgroundColor: '#FFFCFF' }}
            >
              <h4 className='mb-4'>商品明細</h4>
              {state?.carts?.carts?.map((item) => {
                return (
                  <div className='d-flex mb-3' key={item.id}>
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className='me-2'
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className='w-100'>
                      <div className='d-flex justify-content-between'>
                        <p className='mb-0 '>{item.product.title}</p>
                        <p className='mb-0'>
                          <small>x{item.qty}</small>
                        </p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <p
                        // className={`text-muted mb-0 text-decoration-line-through me-1 ${
                        //   hascoupon ? 'd-block' : 'd-none'
                        // }`}
                        >
                          {/* <small>NT$ {item.total.toLocaleString()}</small> */}
                        </p>

                        <p className='mb-0'>
                          NT$ {item.product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* {hascoupon && (
                <table className='table mt-4 border-top border-bottom text-muted'>
                  <tbody>
                    <tr>
                      <th scope='row' className='border-0 px-0 pt-4 fw-normal'>
                        商品總金額
                      </th>
                      <td className='text-end border-0 px-0 pt-4'>
                        NT$ {cartData.total?.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope='row'
                        className='border-0 px-0 pt-0 pb-4 fw-normal'
                      >
                        優惠折抵
                      </th>
                      <td className='text-end border-0 px-0 pt-0 pb-4'>
                        -NT${' '}
                        {(
                          cartData.total - cartData.final_total
                        ).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )} */}
              <hr />
              <div className='d-flex justify-content-between mt-4'>
                <p className='mb-0 h5 fw-bold'>總付款金額</p>
                <p className='mb-0 h5 fw-bold'>
                  NT$ {Math.round(totalAmount)?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CheckOut;
