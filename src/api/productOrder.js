import { API } from '../services/API';

export const createProductOrder = async (data) => {
  const response = await API.post('/product-orders', data);
  return response;
};

export const getAllProductOrders = async () => {
  const response = await API.get('/product-orders');
  return response;
};

export const getProductOrderById = async (id) => {
  const response = await API.get(`/product-orders/${id}`);
  return response;
};

export const updateProductOrder = async (id, data) => {
  const response = await API.put(`/product-orders/${id}`, data);
  return response;
};

export const deleteProductOrder = async (id) => {
  const response = await API.delete(`/product-orders/${id}`);
  return response;
};
