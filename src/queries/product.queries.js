import { API } from '../services/API';

export const getActiveProducts = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);
    
    if (filters.categoryIds && filters.categoryIds.length > 0) {
      filters.categoryIds.forEach(id => queryParams.append('categoryIds', id));
    }
    if (filters.productTypeIds && filters.productTypeIds.length > 0) {
      filters.productTypeIds.forEach(id => queryParams.append('productTypeIds', id));
    }
    if (filters.brandLogoIds && filters.brandLogoIds.length > 0) {
      filters.brandLogoIds.forEach(id => queryParams.append('brandLogoIds', id));
    }
    if (filters.colorIds && filters.colorIds.length > 0) {
      filters.colorIds.forEach(id => queryParams.append('colorIds', id));
    }
    if (filters.countryIds && filters.countryIds.length > 0) {
      filters.countryIds.forEach(id => queryParams.append('countryIds', id));
    }
    if (filters.yearIds && filters.yearIds.length > 0) {
      filters.yearIds.forEach(id => queryParams.append('yearIds', id));
    }

    const response = await API.get(`/products/active?${queryParams.toString()}`);
    return response;
  } catch (error) {
    console.error('Error fetching active products:', error);
    throw error;
  }
};

export const getProductFilterOptions = async () => {
  try {
    const response = await API.get('/products/filter-options');
    return response;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};

export const getProductsPageSettings = async () => {
  try {
    const response = await API.get('/products/page-settings');
    return response;
  } catch (error) {
    console.error('Error fetching products page settings:', error);
    throw error;
  }
};
