import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowLeftRight, Check } from 'lucide-react';
import { useCompare } from '../../contexts/CompareContext';
import { formatNumber } from '../../utils/numberFormat';
import { useGeneralSettings } from '../../hooks/useGeneralSettings';
import { useNavigate } from 'react-router-dom';

const CompareModal = ({ products, getImageUrl }) => {
  const { i18n } = useTranslation();
  const { isModalOpen, closeCompareModal, selectedProductForCompare, addToCompare, compareItems, canAddMore, openCompareModal } = useCompare();
  const navigate = useNavigate();
  const { settings: generalSettings } = useGeneralSettings();
  const isRTL = i18n.language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  if (!isModalOpen) return null;

  const currencyDisplay = isRTL ? generalSettings?.currencySymbol || 'د.إ' : generalSettings?.currencyCode || 'AED';

  // Filter products: exclude the selected product and already compared products
  const availableProducts = useMemo(() => {
    const excludedIds = [...(selectedProductForCompare ? [selectedProductForCompare.id] : []), ...compareItems.map(item => item.id)].filter(Boolean);

    let filtered = products.filter(product => !excludedIds.includes(product.id));

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => {
        const titleEn = (product.titleEn || '').toLowerCase();
        const titleAr = (product.titleAr || '').toLowerCase();
        const descEn = (product.descriptionEn || '').toLowerCase();
        const descAr = (product.descriptionAr || '').toLowerCase();
        return titleEn.includes(query) || titleAr.includes(query) || descEn.includes(query) || descAr.includes(query);
      });
    }

    return filtered;
  }, [products, selectedProductForCompare, compareItems, searchQuery]);

  const handleProductSelect = product => {
    // Add the selected product for compare if it exists
    if (selectedProductForCompare && !compareItems.some(item => item.id === selectedProductForCompare.id)) {
      addToCompare(selectedProductForCompare);
    }
    // Add the clicked product
    if (!compareItems.some(item => item.id === product.id)) {
      addToCompare(product);
    }

    // Clear the selected product so modal can be used for more selections
    // Keep modal open so user can add more products (up to 4 total)
    if (selectedProductForCompare) {
      // Close and reopen modal to clear selectedProductForCompare while keeping it open
      closeCompareModal();
      setTimeout(() => {
        if (compareItems.length < 4) {
          openCompareModal(null);
        }
      }, 50);
    }
  };

  const selectedTitle = selectedProductForCompare ? (isRTL ? selectedProductForCompare.titleAr : selectedProductForCompare.titleEn) : '';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={closeCompareModal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--color-card)] rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] bg-[var(--color-bg1)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] flex items-center justify-center">
                <ArrowLeftRight size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text)]">{isRTL ? 'مقارنة المنتج' : 'Compare Product'}</h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  {selectedProductForCompare
                    ? isRTL
                      ? `اختر منتجًا لمقارنته مع "${selectedTitle}" (${compareItems.length}/4)${canAddMore ? ' - يمكنك إضافة المزيد' : ''}`
                      : `Select a product to compare with "${selectedTitle}" (${compareItems.length}/4)${canAddMore ? ' - You can add more' : ''}`
                    : isRTL
                    ? `اختر منتجًا للمقارنة (${compareItems.length}/4)${canAddMore ? ' - يمكنك إضافة المزيد قبل العرض' : ''}`
                    : `Select a product to compare (${compareItems.length}/4)${canAddMore ? ' - You can add more before viewing' : ''}`}
                </p>
              </div>
            </div>
            <button
              onClick={closeCompareModal}
              className="w-10 h-10 rounded-full hover:bg-[var(--color-bg2)] flex items-center justify-center transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg1)]">
            <div className="relative">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]`} size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={isRTL ? 'ابحث عن منتج...' : 'Search for a product...'}
                className={`w-full ${
                  isRTL ? 'pr-10' : 'pl-10'
                } py-3 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted2)] focus:outline-none focus:ring-2 focus:ring-[var(--color-button-primary-bg)] transition-all`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {!canAddMore ? (
              <div className="text-center py-16">
                <p className="text-[var(--color-text-muted)] text-lg mb-4">
                  {isRTL ? 'تم الوصول إلى الحد الأقصى (4 منتجات)' : 'Maximum products reached (4 products)'}
                </p>
                <button
                  onClick={() => {
                    closeCompareModal();
                    navigate('/products/compare');
                  }}
                  className="px-6 py-2 rounded-xl bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-bg-hover)] text-[var(--color-button-primary-text)] hover:text-[var(--color-button-primary-text-hover)] transition-all font-semibold"
                >
                  {isRTL ? 'عرض المقارنة' : 'View Comparison'}
                </button>
              </div>
            ) : availableProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[var(--color-text-muted)] text-lg">{isRTL ? 'لا توجد منتجات متاحة للمقارنة' : 'No products available for comparison'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableProducts.map(product => {
                  const title = isRTL ? product.titleAr : product.titleEn;
                  const description = isRTL ? product.descriptionAr : product.descriptionEn;
                  const hasDiscount = product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price);

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative bg-[var(--color-card)] rounded-xl border-2 border-[var(--color-border)] overflow-hidden cursor-pointer group hover:border-[var(--color-button-primary-bg)] transition-all"
                      onClick={() => handleProductSelect(product)}
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-40 bg-[var(--color-bg2)]">
                        <img
                          src={getImageUrl(product.imageUrl)}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {hasDiscount && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">{isRTL ? 'خصم' : 'Sale'}</div>
                        )}
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[var(--color-button-primary-bg)]/0 group-hover:bg-[var(--color-button-primary-bg)]/10 transition-colors flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            className="w-12 h-12 rounded-full bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] flex items-center justify-center shadow-lg"
                          >
                            <Check size={20} />
                          </motion.div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-[var(--color-text)] mb-2 line-clamp-2 text-sm">{title}</h3>
                        {description && <p className="text-xs text-[var(--color-text-muted)] mb-3 line-clamp-2">{description}</p>}

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[var(--color-text)]">
                            {formatNumber(parseFloat(product.price).toFixed(0))} {currencyDisplay}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-[var(--color-text-muted)] line-through">
                              {formatNumber(parseFloat(product.oldPrice).toFixed(0))} {currencyDisplay}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-card)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Check size={14} className="text-[var(--color-button-primary-bg)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg1)] flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-muted)]">
              {isRTL
                ? `اختر منتجًا للمقارنة (${compareItems.length}/4) - ${availableProducts.length} متاح`
                : `Select product to compare (${compareItems.length}/4) - ${availableProducts.length} available`}
            </p>
            <div className="flex gap-4">
              {compareItems.length >= 2 && (
                <button
                  onClick={() => {
                    closeCompareModal();
                    navigate('/products/compare');
                  }}
                  className="px-6 py-2 rounded-xl bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-bg-hover)] text-[var(--color-button-primary-text)] hover:text-[var(--color-button-primary-text-hover)] transition-all font-semibold"
                >
                  {isRTL ? 'عرض المقارنة' : 'View Comparison'}
                </button>
              )}
              <button
                onClick={closeCompareModal}
                className="px-6 py-2 rounded-xl bg-[var(--color-button-secondary-bg)] hover:bg-[var(--color-button-secondary-bg-hover)] text-[var(--color-button-secondary-text)] hover:text-[var(--color-button-secondary-text-hover)] border-2 border-[var(--color-border)] transition-all font-semibold"
              >
                {isRTL ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareModal;
