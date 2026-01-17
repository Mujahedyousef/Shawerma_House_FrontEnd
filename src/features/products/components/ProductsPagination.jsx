import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductsPagination = ({ pagination, currentPage, setCurrentPage }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-[var(--color-border)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-muted)] transition-all text-[var(--color-text)] bg-[var(--color-surface-elevated)]"
      >
        {isRTL ? 'السابق' : 'Previous'}
      </button>

      {[...Array(pagination.totalPages)].map((_, index) => {
        const page = index + 1;
        if (page === 1 || page === pagination.totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded-lg transition-all ${
                currentPage === page
                  ? 'bg-[var(--color-brand)] text-white border-border'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-muted)] text-[var(--color-text)] bg-[var(--color-surface-elevated)]'
              }`}
            >
              {page}
            </button>
          );
        } else if (page === currentPage - 2 || page === currentPage + 2) {
          return (
            <span key={page} className="px-2">
              ...
            </span>
          );
        }
        return null;
      })}

      <button
        onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
        disabled={currentPage === pagination.totalPages}
        className="px-4 py-2 border border-[var(--color-border)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-muted)] transition-all text-[var(--color-text)] bg-[var(--color-surface-elevated)]"
      >
        {isRTL ? 'التالي' : 'Next'}
      </button>
    </div>
  );
};

export default ProductsPagination;
