import axios from 'axios';
import Loading from '../../components/Loading';

import { Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function FrontLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState();
  const getProduct = async (page = 1) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
      );
      console.log(res);
      setProducts(res.data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct(1);
  }, []);
  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      console.log(res);
      setCartData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Outlet context={{ products, getCart, cartData }} />
      <Footer />
    </>
  );
}
export default FrontLayout;
