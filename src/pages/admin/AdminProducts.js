import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import ProductModal from '../../components/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import { MessageContext, handleDeleteMessage } from '../store/MessageStore';
import Message from '../../components/Message';
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState();
  const [tempProduct, setTempProduct] = useState({});
  const productModal = useRef(null);
  const deleteModal = useRef(null);
  const [, dispatch] = useContext(MessageContext);
  useEffect(() => {
    productModal.current = new Modal('#productModal', { backdrop: 'static' });
    deleteModal.current = new Modal('#deleteModal', { backdrop: 'static' });
    getProducts();
  }, []);

  const getProducts = async (page = 1) => {
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  };
  const closeProductModal = () => {
    productModal.current.hide();
  };
  const openDeleteModal = (product) => {
    setTempProduct(product);
    console.log(tempProduct);
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };
  const deleteFunction = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      console.log(res);
      if (res.data.success) {
        handleDeleteMessage(dispatch, res);
        getProducts();
        closeDeleteModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='p-3'>
        <Message closeModal={closeProductModal} />
        <ProductModal
          closeProductModal={closeProductModal}
          getProducts={getProducts}
          type={type}
          tempProduct={tempProduct}
        />
        <DeleteModal
          handleDelete={deleteFunction}
          id={tempProduct.id}
          closeDeleteModal={closeDeleteModal}
          text={tempProduct.title}
        />
        <h3>產品列表</h3>
        <hr />
        <div className='text-end'>
          <button
            type='button'
            className='btn btn-primary btn-sm'
            onClick={() => openProductModal('create', {})}
          >
            建立新商品
          </button>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>分類</th>
              <th scope='col'>名稱</th>
              <th scope='col'>參加人數</th>
              <th scope='col'>售價</th>
              <th scope='col'>啟用狀態</th>
              <th scope='col'>編輯</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.category}</td>
                  <td>{item.title}</td>
                  <td>{item.origin_price}</td>
                  <td>{Math.round(item.price)?.toLocaleString()}</td>
                  <td>{item.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm'
                      onClick={() => openProductModal('edit', item)}
                    >
                      編輯
                    </button>
                    <button
                      type='button'
                      className='btn btn-outline-danger btn-sm ms-2'
                      onClick={() => openDeleteModal(item)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 分頁功能 */}
        <Pagination changePage={getProducts} pagination={pagination} />
      </div>
    </>
  );
}

export default AdminProducts;
