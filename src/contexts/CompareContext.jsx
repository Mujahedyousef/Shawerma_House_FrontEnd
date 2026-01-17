import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompareViewOpen, setIsCompareViewOpen] = useState(false);
  const [selectedProductForCompare, setSelectedProductForCompare] = useState(null);

  const addToCompare = useCallback(product => {
    setCompareItems(prev => {
      // Don't add if already in compare list
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      // Limit to 4 products for comparison
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, product];
    });
  });

  const removeFromCompare = useCallback(productId => {
    setCompareItems(prev => prev.filter(item => item.id !== productId));
  });

  const clearCompare = useCallback(() => {
    setCompareItems([]);
  });

  const openCompareModal = useCallback(product => {
    setSelectedProductForCompare(product || null);
    setIsModalOpen(true);
  });

  const closeCompareModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProductForCompare(null);
  });

  const selectProductToCompare = useCallback(product => {
    if (selectedProductForCompare) {
      addToCompare(selectedProductForCompare);
      addToCompare(product);
      closeCompareModal();
    }
  });

  const closeCompareView = useCallback(() => {
    setIsCompareViewOpen(false);
  });

  // Keep compare view open state for page navigation
  useEffect(() => {
    // Only close if we have less than 2 products
    if (compareItems.length < 2) {
      setIsCompareViewOpen(false);
    }
  }, [compareItems.length]);

  const value = {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isModalOpen,
    openCompareModal,
    closeCompareModal,
    selectedProductForCompare,
    selectProductToCompare,
    isCompareViewOpen,
    setIsCompareViewOpen,
    closeCompareView,
    canAddMore: compareItems.length < 4,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
