import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftRight, ShoppingCart } from 'lucide-react';
import { useGeneralSettings } from '../../../hooks/useGeneralSettings';
import { formatNumber } from '../../../utils/numberFormat';
import AnimatedButton from '../../../components/ui/AnimatedButton';
import { useCompare } from '../../../contexts/CompareContext';
import CompareModal from '../../../components/products/CompareModal';
import CompareView from '../../../components/products/CompareView';
import { getImageUrl } from '../../../utils/imageUrl';

const ProductsGrid = ({ products, loading }) => {
  const { i18n } = useTranslation();
  const { settings: generalSettings } = useGeneralSettings();
  const navigate = useNavigate();
  const { openCompareModal, compareItems, isModalOpen, addToCompare } = useCompare();
  const isRTL = i18n.language === 'ar';

  // Get currency display based on language
  const currencyDisplay = isRTL ? generalSettings?.currencySymbol || 'د.إ' : generalSettings?.currencyCode || 'AED';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--color-text-muted)] text-lg">{isRTL ? 'لا توجد منتجات' : 'No products found'}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products?.map(product => {
          const title = isRTL ? product.titleAr : product.titleEn;
          const description = isRTL ? product.descriptionAr : product.descriptionEn;
          const hasDiscount = product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price);

          return (
            <motion.div
              key={product.id}
              className="bg-[var(--color-card-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {/* Product Image */}
              <div className="relative w-full h-48 bg-[var(--color-muted)]">
                {product.imageUrl && <img src={getImageUrl(product.imageUrl)} alt={title} className="w-full h-full object-cover" />}
                {hasDiscount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">{isRTL ? 'خصم' : 'Sale'}</div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-bold text-[var(--color-text)] mb-2 line-clamp-2">{title}</h3>
                {description && <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2 min-h-[40px]">{description}</p>}

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-[var(--color-text)]">
                    {formatNumber(parseFloat(product.price).toFixed(0))} {currencyDisplay}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-[var(--color-text-muted)] line-through">
                      {formatNumber(parseFloat(product.oldPrice).toFixed(0))} {currencyDisplay}
                    </span>
                  )}
                </div>

                {/* Order Button and Compare Icon */}
                <div className="flex items-center gap-2">
                  <AnimatedButton
                    text={isRTL ? 'اطلب المنتج الآن' : 'Order Product Now'}
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/products/${product.id}`);
                    }}
                    icon={ShoppingCart}
                    variant="primary"
                    textSize="sm"
                    className="flex-1"
                  />
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      const isInCompare = compareItems.some(item => item.id === product.id);
                      if (isInCompare) {
                        // Product is already in compare list, navigate to compare page
                        navigate('/products/compare');
                      } else {
                        // If not in compare and we have space, add it
                        if (compareItems.length < 4) {
                          addToCompare(product);
                          // Navigate to compare page when we have at least 2 products
                          if (compareItems.length >= 1) {
                            navigate('/products/compare');
                          }
                        } else {
                          // If compare is full, open modal to replace
                          openCompareModal(product);
                        }
                      }
                    }}
                    className={`w-10 h-10 border-2 rounded-full flex items-center justify-center transition-all ${
                      compareItems.some(item => item.id === product.id)
                        ? 'border-[var(--color-button-primary-bg)] bg-[var(--color-button-primary-bg)]/10'
                        : 'border-[var(--color-border)] hover:border-[var(--color-button-primary-bg)]'
                    }`}
                    title={isRTL ? 'مقارنة المنتج' : 'Compare Product'}
                  >
                    <ArrowLeftRight
                      size={18}
                      className={compareItems.some(item => item.id === product.id) ? 'text-[var(--color-button-primary-bg)]' : 'text-[var(--color-text)]'}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {isModalOpen && <CompareModal products={products} getImageUrl={getImageUrl} />}
      <CompareView getImageUrl={getImageUrl} />
    </>
  );
};

export default ProductsGrid;
