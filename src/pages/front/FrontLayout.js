import axios from 'axios';
import { ProductContext } from '../store/ProductStore';
import { Outlet } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function FrontLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(ProductContext);
  const [cartData, setCartData] = useState({});

  const getCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCartData(res.data.data);
      const updatedCartData = res.data.data;
      dispatch({ type: 'GET_CART', payload: updatedCartData });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
