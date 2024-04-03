import { Routes, Route } from 'react-router-dom';
import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import Cart from './pages/front/Cart';
import ProductDetail from './pages/front/ProductDetail';
import ProductIndex from './pages/front/ProductIndex';
import ProductLayout from './pages/front/ProductLayout';
import ProductGallery from './pages/front/ProductGallery';
import { ProductContext, cartList } from './pages/store/ProductStore';
import { ProductStore } from './pages/store/ProductStore';
import { productReducer } from './pages/store/ProductStore';
import { useReducer } from 'react';
import { initState } from './pages/store/ProductStore';
import CheckOut from './pages/front/CheckOut';
import Success from './pages/front/Success';
import AdminProducts from './pages/admin/AdminProducts';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminOrders from './pages/admin/AdminOrders';
import Search from './pages/front/Search';
function App() {
  const [state, dispatch] = useReducer(productReducer, initState);

  return (
    <>
      <ProductContext.Provider value={[state, dispatch]}>
        <div className='App'>
          <Routes>
            <Route path='/' element={<FrontLayout />}>
              <Route path='' element={<Home />}></Route>
              <Route path='cart' element={<Cart />}></Route>
              <Route path='product' element={<ProductLayout />}>
                <Route index element={<ProductIndex />}></Route>
                <Route path=':categories' element={<ProductGallery />}></Route>
              </Route>
              <Route path='checkout' element={<CheckOut />}></Route>
              <Route path='success/:orderId' element={<Success />}></Route>
              <Route path='search' element={<Search />}></Route>
              <Route
                path='productDetail/:id'
                element={<ProductDetail />}
              ></Route>
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<Dashboard />}>
              <Route path='products' element={<AdminProducts />} />
              <Route path='coupons' element={<AdminCoupons />} />
              <Route path='orders' element={<AdminOrders />} />
            </Route>
          </Routes>
        </div>
      </ProductContext.Provider>
    </>
  );
}

export default App;
