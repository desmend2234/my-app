import { Routes, Route } from 'react-router-dom';
import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import FindPlace from './pages/front/FindPlace';
import Cart from './pages/front/Cart';
import ProductDetail from './pages/front/ProductDetail';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<FrontLayout />}>
          <Route path='' element={<Home />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='findPlace' element={<FindPlace />}></Route>
          <Route path='productDetail' element={<ProductDetail />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
