export const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  return apiUrl.replace(/\/api$/, '') || 'http://localhost:5001';
};

export const getImageUrl = imageUrl => {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${getBaseUrl()}${path}`;
};
