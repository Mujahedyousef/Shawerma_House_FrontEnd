import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGeneralSettings } from '../../../hooks/useGeneralSettings';
import { formatNumber } from '../../../utils/numberFormat';
import { FileText, Download } from 'lucide-react';

const ProductInfo = ({ product, getImageUrl }) => {
  const { i18n } = useTranslation();
  const { settings: generalSettings } = useGeneralSettings();
  const isRTL = i18n.language === 'ar';
  const [downloading, setDownloading] = useState({ technicalDataSheet: false, catalog: false });

  const currencyDisplay = isRTL ? generalSettings?.currencySymbol : generalSettings?.currencyCode;

  const handleDownload = async (fileUrl, fileName, type) => {
    try {
      setDownloading(prev => ({ ...prev, [type]: true }));

      const fullUrl = getImageUrl(fileUrl);

      // Fetch the file as a blob
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/pdf,application/octet-stream,*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;

      // Extract filename from URL or use provided default
      const urlParts = fileUrl.split('/');
      const originalFileName = urlParts[urlParts.length - 1] || fileName;
      link.download = originalFileName;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Fallback: try direct download with download attribute
      const fullUrl = getImageUrl(fileUrl);
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(prev => ({ ...prev, [type]: false }));
    }
  };

  if (!product) return null;

  const title = isRTL ? product.titleAr : product.titleEn;
  const description = isRTL ? product.descriptionAr : product.descriptionEn;
  const detailedDescription = isRTL ? product.detailedDescriptionAr : product.detailedDescriptionEn;
  const hasDiscount = product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price);

  return (
    <div className={`lg:col-span-2 space-y-6 `}>
      {/* Product Name */}
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">{title}</h1>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-[var(--color-text)]">
          {formatNumber(parseFloat(product.price).toFixed(0))} {currencyDisplay}
        </span>
        {hasDiscount && (
          <span className="text-xl text-[var(--color-text-muted)] line-through">
            {formatNumber(parseFloat(product.oldPrice).toFixed(0))} {currencyDisplay}
          </span>
        )}
      </div>

      {/* Key Details Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[var(--color-border)] rounded-xl bg-[var(--color-card-surface)] overflow-hidden">
        {/* Availability */}
        <div className={`p-4 border-r border-[var(--color-border)] ${isRTL ? 'border-l border-r-0 last:border-l-0' : 'last:border-r-0'}`}>
          <p className={`text-xs text-[var(--color-text-muted)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'حالة التوفر:' : 'Availability:'}</p>
          <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
            {product.availability !== null && product.availability !== undefined
              ? isRTL
                ? `عدد القطع: ${product.availability}`
                : `Quantity: ${product.availability}`
              : isRTL
              ? 'غير متوفر'
              : 'Not Available'}
          </p>
        </div>

        {/* Country */}
        <div className={`p-4 border-r border-[var(--color-border)] ${isRTL ? 'border-l border-r-0' : ''}`}>
          <p className={`text-xs text-[var(--color-text-muted)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'بلد المنشأ:' : 'Country of Origin:'}</p>
          <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
            {product.country ? (isRTL ? product.country.nameAr : product.country.nameEn) : isRTL ? 'غير محدد' : 'Not Specified'}
          </p>
        </div>

        {/* Warranty */}
        <div className={`p-4 border-r border-[var(--color-border)] ${isRTL ? 'border-l border-r-0' : ''}`}>
          <p className={`text-xs text-[var(--color-text-muted)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الضمان:' : 'Warranty:'}</p>
          <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
            {product.warranty || (isRTL ? 'غير محدد' : 'Not Specified')}
          </p>
        </div>

        {/* Brand */}
        <div className={`p-4 ${isRTL ? 'border-l border-[var(--color-border)]' : ''}`}>
          <p className={`text-xs text-[var(--color-text-muted)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'العلامة التجارية:' : 'Brand:'}</p>
          {product.brandLogo ? (
            product.brandLogo.imageUrl ? (
              <div className={`${isRTL ? 'flex justify-end' : 'flex justify-start'}`}>
                <img
                  src={getImageUrl(product.brandLogo.imageUrl)}
                  alt={isRTL ? product.brandLogo.nameAr : product.brandLogo.nameEn}
                  className="h-8 object-contain max-w-full"
                />
              </div>
            ) : (
              <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? product.brandLogo.nameAr : product.brandLogo.nameEn}
              </p>
            )
          ) : (
            <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'غير محدد' : 'Not Specified'}</p>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div>
          <h2 className={`text-xl font-bold text-[var(--color-text)] mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الوصف' : 'Description'}</h2>
          <p className={`text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>{description}</p>
        </div>
      )}

      {/* Detailed Description */}
      {detailedDescription && (
        <div>
          <h2 className={`text-xl font-bold text-[var(--color-text)] mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'التفاصيل' : 'Details'}</h2>
          <div
            className={`rich-text-content text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
            dangerouslySetInnerHTML={{ __html: detailedDescription }}
          />
          <style>{`
            .rich-text-content ul,
            .rich-text-content ol {
              margin: 1rem 0;
              ${isRTL ? 'padding-right: 1.5rem;' : 'padding-left: 1.5rem;'}
              ${isRTL ? 'padding-left: 0;' : 'padding-right: 0;'}
            }
            .rich-text-content ul {
              list-style-type: disc;
            }
            .rich-text-content ol {
              list-style-type: decimal;
            }
            .rich-text-content li {
              margin: 0.5rem 0;
              ${isRTL ? 'text-align: right;' : 'text-align: left;'}
              display: list-item;
            }
            .rich-text-content ul ul,
            .rich-text-content ol ol,
            .rich-text-content ul ol,
            .rich-text-content ol ul {
              margin: 0.5rem 0;
            }
            .rich-text-content p {
              margin: 1rem 0;
            }
            .rich-text-content strong {
              font-weight: 600;
            }
            .rich-text-content em {
              font-style: italic;
            }
            .rich-text-content a {
              color: var(--color-brand);
              text-decoration: underline;
            }
            .rich-text-content h1,
            .rich-text-content h2,
            .rich-text-content h3,
            .rich-text-content h4,
            .rich-text-content h5,
            .rich-text-content h6 {
              font-weight: 700;
              margin-top: 1.5rem;
              margin-bottom: 1rem;
              color: var(--color-text);
            }
          `}</style>
        </div>
      )}

      {/* Technical Specifications */}
      {product.technicalSpecs && product.technicalSpecs.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold text-[var(--color-text)] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'المواصفات التقنية' : 'Technical Specifications'}
          </h2>
          <div className="bg-[var(--color-card-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {product.technicalSpecs.map((spec, index) => (
                  <tr key={spec.id || index} className={`border-b border-[var(--color-border)] last:border-b-0 ${index % 2 === 0 ? 'bg-[var(--color-muted)]' : 'bg-[var(--color-card-surface)]'}`}>
                    <td className={`px-4 py-3 font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? spec.titleAr : spec.titleEn}
                    </td>
                    <td className={`px-4 py-3 text-[var(--color-text-muted)] ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? spec.valueAr : spec.valueEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Additional Information - Product Files */}
      {(product.technicalDataSheetUrl || product.catalogUrl) && (
        <div>
          <h2 className={`text-xl font-bold text-[var(--color-text)] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'معلومات إضافية' : 'Additional Information'}
          </h2>
          <div className="flex gap-4 items-center">
            {/* Technical Data Sheet */}
            {product.technicalDataSheetUrl && (
              <button
                onClick={() => handleDownload(product.technicalDataSheetUrl, 'technical-data-sheet.pdf', 'technicalDataSheet')}
                disabled={downloading.technicalDataSheet}
                className="group flex flex-col items-center justify-center p-4 bg-[var(--color-muted)] hover:bg-[var(--color-border)] border border-[var(--color-border)] rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed max-w-44 w-full"
              >
                <div className="w-6 h-6 mb-2 flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
                  {downloading.technicalDataSheet ? (
                    <div className="w-6 h-6 border-2 border-[var(--color-text-muted)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FileText className="w-6 h-6" />
                  )}
                </div>
                <span className={`text-sm font-semibold text-[var(--color-text)] text-center w-full `}>
                  {downloading.technicalDataSheet ? (isRTL ? 'جاري التحميل...' : 'Downloading...') : isRTL ? 'ورقة البيانات الفنية' : 'Technical Data Sheet'}
                </span>
              </button>
            )}

            {/* Catalog */}
            {product.catalogUrl && (
              <button
                onClick={() => handleDownload(product.catalogUrl, 'catalog.pdf', 'catalog')}
                disabled={downloading.catalog}
                className="group flex flex-col items-center justify-center p-4 bg-[var(--color-muted)] hover:bg-[var(--color-border)] border border-[var(--color-border)] rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed max-w-44 w-full"
              >
                <div className="w-6 h-6 mb-2 flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
                  {downloading.catalog ? (
                    <div className="w-6 h-6 border-2 border-[var(--color-text-muted)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-6 h-6" />
                  )}
                </div>
                <span className={`text-sm font-semibold text-[var(--color-text)] text-center `}>
                  {downloading.catalog ? (isRTL ? 'جاري التحميل...' : 'Downloading...') : isRTL ? 'تحميل كتالوج' : 'Download Catalog'}
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
