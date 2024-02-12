import axios from 'axios';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';

function Success() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});
  const { getCart } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  //"-NoujK0AysqHAydKJnCo"
  const paySuccess = async (orderId) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      );
      console.log(res);
      setOrderData(res.data.order);
      getCart();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    paySuccess(orderId);
  }, [orderId]);

  return (
    <div className='container'>
      <div
        style={{
          minHeight: '400px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundPosition: ' center center',
        }}
      ></div>
      <div className='mt-5 mb-7'>
        <div className='row'>
          <div className='col-md-6'>
            <h2>訂購成功</h2>
            <p>
              感謝您的訂購！我們已經收到您的付款並確認訂單。您的商品將於三個工作日內進行出貨，請留意您所提供的聯絡方式，以便及時接收配送通知。如有任何疑問或需要協助，請隨時聯繫我們的客服團隊。再次感謝您的支持，祝您有個愉快的購物體驗！
            </p>
            <a
              href='./index.html'
              className='btn btn-outline-dark me-2 rounded-0 mb-4'
            >
              回首頁
            </a>
          </div>
          <div className='col-md-6'>
            <div className='card rounded-0 py-4'>
              <div className='card-header border-bottom-0 bg-white px-4 py-0'>
                <h2>訂購細項</h2>
              </div>
              <div className='card-body px-4 py-0'>
                <ul className='list-group list-group-flush'>
                  {Object.values(orderData?.products || {}).map((item) => {
                    return (
                      <li className='list-group-item px-0' key={item.id}>
                        <div className='d-flex mt-2'>
                          <img
                            src={item.product.imageUrl}
                            alt=''
                            className='me-2'
                            style={{
                              width: '60px',
                              height: '60px',
                              objectFit: 'cover',
                            }}
                          />
                          <div className='w-100 d-flex flex-column'>
                            <div className='d-flex justify-content-between fw-bold'>
                              <h5>{item.product.title}</h5>
                              <p className='mb-0'>x{item.qty}</p>
                            </div>
                            <div className='d-flex justify-content-between mt-auto'>
                              <p className='text-muted mb-0'>
                                <small>NT${item.product.price}</small>
                              </p>
                              <p className='mb-0'>NT$ {item.total}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}

                  <li className='list-group-item px-0 pb-0'>
                    <table className='table text-muted'>
                      <tbody>
                        <tr>
                          <th
                            scope='row'
                            className='border-0 px-0 font-weight-normal'
                          >
                            優惠券
                          </th>
                          <td className='text-end border-0 px-0'>
                            NT${orderData.total}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope='row'
                            className='border-0 px-0 pt-0 font-weight-normal'
                          >
                            Payment
                          </th>
                          <td className='text-end border-0 px-0 pt-0'>
                            ApplePay
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='d-flex justify-content-between mt-2'>
                      <p className='mb-0 h4 fw-bold'>合計</p>
                      <p className='mb-0 h4 fw-bold'>NT${orderData.total}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Success;
