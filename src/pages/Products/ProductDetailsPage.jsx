import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API } from '../../services/API';
import ProductBackButton from '../../features/productDetails/components/ProductBackButton';
import ProductImageGallery from '../../features/productDetails/components/ProductImageGallery';
import ProductInfo from '../../features/productDetails/components/ProductInfo';
import ProductOrderForm from '../../features/productDetails/components/ProductOrderForm';
import ProductMediaSection from '../../features/productDetails/components/ProductMediaSection';
import SimilarProducts from '../../features/productDetails/components/SimilarProducts';
import StartProjectSection from '../../features/landing/components/StartProjectSection';
import { getImageUrl } from '../../utils/imageUrl';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Fetch similar products when product loads
  useEffect(() => {
    if (product?.id) {
      fetchSimilarProducts(product.id);
    }
  }, [product?.id]);

  const fetchSimilarProducts = async productId => {
    try {
      const response = await API.get(`/products/${productId}/similar`);
      if (response.data?.success) {
        setSimilarProducts(response.data.data || []);
      } else if (response.data) {
        setSimilarProducts(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching similar products:', error);
      setSimilarProducts([]);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/products/${id}`);
      if (response.data?.success) {
        setProduct(response.data.data);
      } else if (response.data) {
        // Handle case where API returns data directly
        setProduct(response.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-text-muted)] text-lg mb-4">{isRTL ? 'المنتج غير موجود' : 'Product not found'}</p>
          <ProductBackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className=" mx-auto px-4 md:px-8 pt-16 pb-8">
        <ProductBackButton />

        <ProductImageGallery product={product} getImageUrl={getImageUrl} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProductInfo product={product} getImageUrl={getImageUrl} />
          <ProductOrderForm product={product} />
        </div>
      </div>
      <div className="space-y-16">
        <ProductMediaSection product={product} getImageUrl={getImageUrl} />
        <SimilarProducts similarProducts={similarProducts} getImageUrl={getImageUrl} />
        <StartProjectSection />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
