import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCompare } from '../../contexts/CompareContext';
import AnimatedButton from '../../components/ui/AnimatedButton';
import CompareView from '../../components/products/CompareView';
import { getImageUrl } from '../../utils/imageUrl';

const ComparePage = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { compareItems, setIsCompareViewOpen } = useCompare();
  const isRTL = i18n.language === 'ar';

  // Set compare view as open when on this page
  React.useEffect(() => {
    if (compareItems.length >= 2) {
      setIsCompareViewOpen(true);
    }
  }, [compareItems.length, setIsCompareViewOpen]);

  if (compareItems.length < 2) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-text-muted)] text-lg mb-4">
            {isRTL ? 'يجب اختيار منتجين على الأقل للمقارنة' : 'Please select at least 2 products to compare'}
          </p>
          <AnimatedButton
            text={isRTL ? 'العودة إلى المنتجات' : 'Back to Products'}
            onClick={() => navigate('/products')}
            icon={ArrowLeft}
            variant="primary"
            textSize="base"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto px-4 md:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>{isRTL ? 'العودة إلى المنتجات' : 'Back to Products'}</span>
        </button>

        {/* Compare View */}
        <CompareView getImageUrl={getImageUrl} />
      </div>
    </div>
  );
};

export default ComparePage;
