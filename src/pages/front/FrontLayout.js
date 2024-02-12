import axios from 'axios';
import Loading from '../../components/Loading';
import { ProductContext } from '../store/ProductStore';
import { Outlet } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductIndex from './ProductIndex';
import { getProduct } from '../store/ProductStore';
function FrontLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(ProductContext);
  const [cartData, setCartData] = useState({});

  // async function getProduct(page = 1) {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.get(
  //       `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
  //     );
  //     dispatch({ type: 'GET_PRODUCTS', payload: res.data.products });
  //     setIsLoading(false);
  //     dispatch({ type: 'GET_PAGE', payload: res.data.pagination });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const getCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCartData(res.data.data);
      const updatedCartData = res.data.data; // 假設這是你的購物車數據
      dispatch({ type: 'GET_CART', payload: updatedCartData });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   getProduct(1, dispatch);
  //   getAllProduct();
  // }, []);
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet context={{ getCart }} />
      <Footer />
    </>
  );
}
export default FrontLayout;
