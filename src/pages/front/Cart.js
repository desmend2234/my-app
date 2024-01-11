function Cart() {
  return (
    <>
      <div className='container pb-3 pt-1 mt-6  bg-light w-50'>
        <h4 className='mt-2 d-flex  justify-content-center'>購物車內容</h4>
        <div className='row mb-2 mt-4 d-flex justify-content-center align-items-center '>
          <div className='col-lg-2 col-3 '>
            <img
              src='https://images.unsplash.com/photo-1586274677440-231405a4c74c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              className='object-cover '
              width='100px'
              height='100px'
            />
          </div>
          <div className='col-lg-3 col-3 '>
            <h5 className='px-2'>title</h5>
          </div>

          <div className='col-lg-2 col-3 '>
            <select
              name=''
              className='form-select'
              id=''
              value={0}
              // disabled={loadingItems.includes(item.id)}
              // onChange={(e) => {
              //   updateCartItem(item, e.target.value * 1);
              // }}
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
          <div className='col-lg-3 col-3 d-flex justify-content-end align-items-center'>
            {/* <p className='mb-0 text-decoration-line-through text-muted text-end me-1'>
              <small>NT$ 500</small>
            </p> */}
            <item className='text-end d-flex align-items-center'>NT$ 500</item>{' '}
            <button
              type='button'
              className='btn align-items-center d-flex'
              aria-label='Delete'
              //   style={{ top: '55px', right: '16px' }}
              //   onClick={() => {
              //     removeCartItem(item.id);
              //   }}
            >
              <i
                className='bi bi-x-lg ms-3'
                style={{ position: 'relative', right: '0vw' }}
              ></i>
            </button>
          </div>
        </div>
      </div>
      <div className='container w-50 bg-secondary'>
        <div className='row d-flex justify-content-end mt-3 mb-5'>
          <div className='col-12 d-flex justify-content-end'>
            <table className='table text-muted d-flex justify-content-end mt-3'>
              <tbody>
                <tr>
                  <th scope='row' className='border-0 px-3 fw-normal'>
                    商品總金額
                  </th>
                  <td className='text-end border-0 px-3'>NT$ 500</td>
                </tr>
                <tr>
                  <th scope='row' className='border-0 px-3 pt-0 fw-normal'>
                    優惠折抵
                  </th>
                  <td className='text-end border-0 px-3 pt-0'>NT$ 500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
