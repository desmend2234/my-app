import { createContext, useEffect } from 'react';
import axios from 'axios';
export const ProductContext = createContext({});

export const initState = {
  cartList: [],
  carts: [],
  product: [],
  productAll: [],
};

export const productReducer = (state, action) => {
  const cartList = [...state.cartList];
  const carts = action.payload?.carts || [];
  const product = [...state.product];
  const productAll = [...state.productAll];

  switch (action.type) {
    case 'ADD_TO_CART':
      const productsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return {
        ...state,
        cartList: [...cartList, ...productsToAdd],
        carts: {
          ...state.carts,
          carts: [...state.carts.carts, ...productsToAdd],
        },
      };
    case 'GET_ALL_PRODUCTS':
      return { ...state, productAll: action.payload };
    case 'GET_PRODUCTS':
      return { ...state, product: action.payload };
    case 'GET_CART':
      return { ...state, carts: action.payload };
    case 'GET_PAGE':
      return { ...state, page: action.payload };
    case 'GET_PRODUCT_FUNCTION':
      return { ...state, getProduct: action.payload };
    default:
      return state;
  }
};
export async function getProduct(page = 1, dispatch) {
  try {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    console.log(res);
    dispatch({ type: 'GET_PRODUCTS', payload: res.data.products });
    dispatch({ type: 'GET_PAGE', payload: res.data.pagination });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProduct(dispatch) {
  const res = await axios.get(
    `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
  );
  console.log(res);
  dispatch({ type: 'GET_ALL_PRODUCTS', payload: res.data.products });
}
