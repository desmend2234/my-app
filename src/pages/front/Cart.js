import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../store/ProductStore';
import Loading from '../../components/Loading';

import axios from 'axios';
import { Link, useOutletContext } from 'react-router-dom';

function Cart() {
  const [state, dispatch] = useContext(ProductContext);
  const { getCart } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = Array.isArray(state?.carts?.carts)
    ? state?.carts?.carts.reduce(
        (total, item) => total + item.product?.price * item.qty,
        0
      )
    : 0;
  const updateCartItem = async (item, quantity) => {
    const data = { data: { product_id: item.product_id, qty: quantity } };
    try {
      setIsLoading(true);
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      getCart();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  const removeCartItem = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
      setIsLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedDate = (id) => {
    const startDateString = localStorage.getItem(`selectedStartDate_${id}`);
    const endDateString = localStorage.getItem(`selectedEndDate_${id}`);
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
    const startDay = String(startDate.getDate()).padStart(2, '0');
    const formattedStartDate = `${startYear}/${startMonth}/${startDay}`;

    const endYear = endDate.getFullYear();
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
    const endDay = String(endDate.getDate()).padStart(2, '0');
    const formattedEndDate = `${endYear}/${endMonth}/${endDay}`;

    return `${formattedStartDate} - ${formattedEndDate}`;
  };
  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-7 col-md-8 bg-white py-5'>
            <h3
              className='mt-6 mb-2 d-flex  justify-content-center fw-bold '
              style={{ color: '#252525' }}
            >
              購物車內容
            </h3>
            {state?.carts?.carts?.map((item, index) => {
              if (item && item.product) {
                return (
                  <div
                    className='d-flex mt-2 mb-2 p-2  align-items-center'
                    key={item.id}
                    style={{ backgroundColor: '#F5F5F5', borderRadius: '15px' }}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt=''
                      className='object-cover '
                      width='200px'
                      height='150px'
                      style={{ borderRadius: '15px' }}
                    />
                    <div className='w-100 ms-3 position-relative d-flex flex-column justify-content-between'>
                      <button
                        type='button'
                        className='position-absolute btn border-0'
                        aria-label='Delete'
                        onClick={() => {
                          removeCartItem(item.id);
                        }}
                        style={{ right: '-8px', top: '-8px' }}
                      >
                        <i className='bi bi-x-lg ms-0'></i>
                      </button>
                      <h5 className='px-2 fw-bold'>{item.product.title}</h5>
                      <p className='px-2'>{selectedDate(item.product.id)}</p>
                      <div className='row justify-content-between align-items-center w-100'>
                        <div className='col-lg-4 col-sm-5 col-7 md-mb-0 mb-2'>
                          <select
                            name=''
                            className='form-select '
                            id=''
                            value={item.qty}
                            onChange={(e) => {
                              updateCartItem(item, e.target.value * 1);
                            }}
                          >
                            {[...new Array(20)].map((i, num) => {
                              return (
                                <option value={num + 1} key={num}>
                                  {num + 1}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className='fw-bold col-lg-8 col-sm-7 col-12 d-flex justify-content-sm-end justify-content-start '>
                          NT${' '}
                          {Math.round(
                            item.product.price * item.qty
                          )?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                console.log(
                  `Skipping iteration at index ${index} due to missing data.`
                );
                return null;
              }
            })}

            <table className='table text-muted d-flex justify-content-center mt-3'>
              <tbody>
                <tr className='d-flex justify-content-between mt-4'>
                  <th scope='row' className='border-0 px-3 fw-normal'>
                    商品總金額
                  </th>
                  <td className='text-end border-0 px-3'>
                    NT$ {Math.round(totalAmount)?.toLocaleString()}
                  </td>
                </tr>
                <tr className='d-flex justify-content-between mt-4'>
                  <th scope='row' className='border-0 px-3 pt-0 fw-normal'>
                    優惠折抵
                  </th>
                  <td className='text-end border-0 px-3 pt-0'>NT$ 500</td>
                </tr>

                <tr className='d-flex justify-content-between mt-4'>
                  <th className='mb-0 h4 fw-bold'>總付款金額</th>
                  <td className='mb-0 h4 fw-bold'>
                    NT$ {Math.round(totalAmount) - 500?.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className='justify-content-center d-flex '>
              <Link
                to='/checkout'
                className='w-50 btn bg-warning mt-1 rounded-0 py-3 mb-6 fw-bold fs-5'
                style={{ color: 'white' }}
              >
                前往結帳
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
