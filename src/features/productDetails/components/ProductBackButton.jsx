import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

const ProductBackButton = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <button
      onClick={() => navigate('/products')}
      className="mb-6 flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all"
    >
      <ArrowLeft size={20} />
      <span>{isRTL ? 'العودة إلى المنتجات' : 'Back to Products'}</span>
    </button>
  );
};

export default ProductBackButton;
