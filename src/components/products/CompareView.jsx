import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeftRight, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompare } from '../../contexts/CompareContext';
import { useGeneralSettings } from '../../hooks/useGeneralSettings';
import { formatNumber } from '../../utils/numberFormat';
import AnimatedButton from '../ui/AnimatedButton';

const CompareView = ({ getImageUrl }) => {
  const { i18n } = useTranslation();
  const { compareItems, removeFromCompare, clearCompare, canAddMore, openCompareModal } = useCompare();
  const { settings: generalSettings } = useGeneralSettings();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const currencyDisplay = isRTL ? generalSettings?.currencySymbol || 'د.إ' : generalSettings?.currencyCode || 'AED';

  if (compareItems.length < 2) return null;

  const getProductData = product => {
    const title = isRTL ? product.titleAr : product.titleEn;
    const description = isRTL ? product.descriptionAr : product.descriptionEn;
    const detailedDescription = isRTL ? product.detailedDescriptionAr : product.detailedDescriptionEn;
    const hasDiscount = product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price);

    return {
      title,
      description,
      detailedDescription,
      hasDiscount,
      price: product.price,
      oldPrice: product.oldPrice,
      availability: product.availability,
      country: product.country ? (isRTL ? product.country.nameAr : product.country.nameEn) : null,
      warranty: product.warranty,
      brand: product.brandLogo ? (isRTL ? product.brandLogo.nameAr : product.brandLogo.nameEn) : null,
      brandImage: product.brandLogo?.imageUrl,
      technicalSpecs: product.technicalSpecs || [],
      imageUrl: product.imageUrl,
    };
  };

  const productsData = compareItems.map(product => getProductData(product));

  const comparisonFields = [
    {
      label: isRTL ? 'الصورة' : 'Image',
      type: 'image',
    },
    {
      label: isRTL ? 'الاسم' : 'Name',
      type: 'title',
    },
    {
      label: isRTL ? 'السعر' : 'Price',
      type: 'price',
    },
    {
      label: isRTL ? 'الوصف' : 'Description',
      type: 'description',
    },
    {
      label: isRTL ? 'التوفر' : 'Availability',
      type: 'availability',
    },
    {
      label: isRTL ? 'بلد المنشأ' : 'Country of Origin',
      type: 'country',
    },
    {
      label: isRTL ? 'الضمان' : 'Warranty',
      type: 'warranty',
    },
    {
      label: isRTL ? 'العلامة التجارية' : 'Brand',
      type: 'brand',
    },
    {
      label: isRTL ? 'المواصفات التقنية' : 'Technical Specifications',
      type: 'specs',
    },
  ];

  const renderFieldValue = (product, fieldType, productData) => {
    switch (fieldType) {
      case 'image':
        return (
          <div className="w-full h-64 bg-[var(--color-bg2)] rounded-xl overflow-hidden flex items-center justify-center">
            <img src={getImageUrl(productData.imageUrl)} alt={productData.title} className="w-full h-full object-contain max-w-full max-h-full" />
          </div>
        );
      case 'title':
        return <h3 className="text-xl font-bold text-[var(--color-text)]">{productData.title}</h3>;
      case 'price':
        return (
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-[var(--color-text)]">
              {formatNumber(parseFloat(productData.price).toFixed(0))} {currencyDisplay}
            </span>
            {productData.hasDiscount && (
              <span className="text-sm text-[var(--color-text-muted)] line-through">
                {formatNumber(parseFloat(productData.oldPrice).toFixed(0))} {currencyDisplay}
              </span>
            )}
          </div>
        );
      case 'description':
        return (
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed whitespace-normal break-words">
            {productData.description || (isRTL ? 'غير متوفر' : 'Not Available')}
          </p>
        );
      case 'availability':
        return (
          <p className="text-[var(--color-text)] font-semibold">
            {productData.availability !== null && productData.availability !== undefined
              ? isRTL
                ? `عدد القطع: ${productData.availability}`
                : `Quantity: ${productData.availability}`
              : isRTL
              ? 'غير متوفر'
              : 'Not Available'}
          </p>
        );
      case 'country':
        return <p className="text-[var(--color-text)]">{productData.country || (isRTL ? 'غير محدد' : 'Not Specified')}</p>;
      case 'warranty':
        return <p className="text-[var(--color-text)]">{productData.warranty || (isRTL ? 'غير محدد' : 'Not Specified')}</p>;
      case 'brand':
        return (
          <div className="flex items-center gap-2">
            {productData.brandImage ? (
              <img src={getImageUrl(productData.brandImage)} alt={productData.brand} className="h-8 object-contain max-w-full" />
            ) : (
              <p className="text-[var(--color-text)]">{productData.brand || (isRTL ? 'غير محدد' : 'Not Specified')}</p>
            )}
          </div>
        );
      case 'specs':
        return (
          <div className="space-y-2">
            {productData.technicalSpecs.length > 0 ? (
              productData.technicalSpecs.slice(0, 5).map((spec, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-semibold text-[var(--color-text)]">{isRTL ? spec.titleAr : spec.titleEn}:</span>{' '}
                  <span className="text-[var(--color-text-muted)]">{isRTL ? spec.valueAr : spec.valueEn}</span>
                </div>
              ))
            ) : (
              <p className="text-[var(--color-text-muted)] text-sm">{isRTL ? 'غير متوفر' : 'Not Available'}</p>
            )}
            {productData.technicalSpecs.length > 5 && (
              <p className="text-xs text-[var(--color-text-muted)]">
                {isRTL ? `+${productData.technicalSpecs.length - 5} أكثر` : `+${productData.technicalSpecs.length - 5} more`}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full bg-[var(--color-card)] rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] bg-[var(--color-bg1)] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] flex items-center justify-center">
              <ArrowLeftRight size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text)]">{isRTL ? 'مقارنة المنتجات' : 'Compare Products'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {isRTL
                  ? `قارن بين ${compareItems.length} منتج${compareItems.length > 2 ? 'ات' : 'ين'}${
                      canAddMore ? ` (يمكن إضافة ${4 - compareItems.length} أكثر)` : ''
                    }`
                  : `Compare ${compareItems.length} product${compareItems.length > 1 ? 's' : ''} side by side${
                      canAddMore ? ` (can add ${4 - compareItems.length} more)` : ''
                    }`}
              </p>
            </div>
          </div>

          <X
            size={20}
            className="cursor-pointer"
            onClick={() => {
              clearCompare();
              navigate('/products');
            }}
          />
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <colgroup>
              <col style={{ width: '200px' }} />
              {productsData.map(() => (
                <col key={Math.random()} style={{ width: `${100 / productsData.length}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg1)]">
                <th
                  className={`px-6 py-4 text-left font-bold text-[var(--color-text)] ${
                    isRTL ? 'text-right' : 'text-left'
                  } sticky left-0 bg-[var(--color-bg1)] z-10`}
                >
                  {isRTL ? 'الميزة' : 'Feature'}
                </th>
                {productsData.map((productData, idx) => (
                  <th key={idx} className="px-6 py-4 text-center font-bold text-[var(--color-text)] relative">
                    <div className="flex flex-col items-center gap-2">
                      <span className="line-clamp-2">{productData.title}</span>
                      <button
                        onClick={() => removeFromCompare(compareItems[idx].id)}
                        className="w-6 h-6 rounded-full hover:bg-[var(--color-bg2)] flex items-center justify-center transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text)] mt-1"
                        title={isRTL ? 'إزالة من المقارنة' : 'Remove from comparison'}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map((field, index) => (
                <tr
                  key={field.type}
                  className={`border-b border-[var(--color-border)] ${index % 2 === 0 ? 'bg-[var(--color-card)]' : 'bg-[var(--color-bg1)]'}`}
                >
                  <td className={`px-6 py-4 font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'} sticky left-0 bg-inherit z-10`}>
                    {field.label}
                  </td>
                  {compareItems.map((product, idx) => (
                    <td key={idx} className="px-6 py-4 align-top break-words">
                      {renderFieldValue(product, field.type, productsData[idx])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-bg1)] flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {compareItems.map((product, idx) => (
              <AnimatedButton
                key={product.id}
                text={isRTL ? `عرض المنتج ${idx + 1}` : `View Product ${idx + 1}`}
                onClick={() => {
                  navigate(`/products/${product.id}`);
                }}
                icon={ShoppingCart}
                variant="secondary"
                textSize="sm"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            {canAddMore && (
              <button
                onClick={() => {
                  navigate('/products');
                  setTimeout(() => {
                    openCompareModal(null);
                  }, 100);
                }}
                className="px-6 py-2 rounded-xl bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-bg-hover)] text-[var(--color-button-primary-text)] hover:text-[var(--color-button-primary-text-hover)] transition-all font-semibold flex items-center gap-2"
              >
                <ArrowLeftRight size={18} />
                {isRTL ? `إضافة منتج آخر (${4 - compareItems.length} متبقي)` : `Add Another Product (${4 - compareItems.length} left)`}
              </button>
            )}
            <button
              onClick={() => {
                compareItems.forEach(product => removeFromCompare(product.id));
              }}
              className="px-6 py-2 rounded-xl bg-[var(--color-button-secondary-bg)] hover:bg-[var(--color-button-secondary-bg-hover)] text-[var(--color-button-secondary-text)] hover:text-[var(--color-button-secondary-text-hover)] border-2 border-[var(--color-border)] transition-all font-semibold"
            >
              {isRTL ? 'مسح المقارنة' : 'Clear Comparison'}
            </button>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2 rounded-xl bg-[var(--color-button-secondary-bg)] hover:bg-[var(--color-button-secondary-bg-hover)] text-[var(--color-button-secondary-text)] hover:text-[var(--color-button-secondary-text-hover)] border-2 border-[var(--color-border)] transition-all font-semibold"
            >
              {isRTL ? 'العودة إلى المنتجات' : 'Back to Products'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompareView;
