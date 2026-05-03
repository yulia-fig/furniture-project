import axios from 'axios';

const API_BASE_URL = 'https://furniture-store-v2.b.goit.study/api';
const API_ENDPOINTS = {
  CATEGORIES: '/categories',
  PRODUCTS: '/furnitures',
};
const ITEMS_PER_PAGE = 8;

axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
  const res = await axios(`${API_ENDPOINTS.CATEGORIES}`);
  return res.data;
}

export async function getProducts(page) {
  const res = await axios(
    `${API_ENDPOINTS.PRODUCTS}?page=${page}&limit=${ITEMS_PER_PAGE}`
  );
  return res.data;
}

export async function getProductsByCategory(category, page) {
  const res = await axios(
    `${API_ENDPOINTS.PRODUCTS}?page=${page}&limit=${ITEMS_PER_PAGE}&category=${category}`
  );
  return res.data;
}

export async function getProductInModal(id) {
  const res = await axios(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  return res.data;
}
