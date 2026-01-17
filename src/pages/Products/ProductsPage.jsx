import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useProductFilters, useProductsPageSettings } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import ProductsHero from '../../features/products/components/ProductsHero';
import ProductsFilters from '../../features/products/components/ProductsFilters';
import ProductsSearchBar from '../../features/products/components/ProductsSearchBar';
import ProductsGrid from '../../features/products/components/ProductsGrid';
import ProductsPagination from '../../features/products/components/ProductsPagination';
import { getImageUrl } from '../../utils/imageUrl';

const ProductsPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchParams] = useSearchParams();

  // Page settings
  const { settings } = useProductsPageSettings();

  // Filter options
  const { filterOptions } = useProductFilters();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('order');
  const [sortOrder, setSortOrder] = useState('asc');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [selectedCategories, setSelectedCategories] = useState(() => {
    // Get categoryId from URL params on mount
    const categoryId = searchParams.get('categoryId');
    return categoryId ? [categoryId] : [];
  });
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Accordion states for filters
  const [expandedFilters, setExpandedFilters] = useState({
    price: false,
    category: false,
    productType: false,
    brand: false,
    color: false,
    country: false,
    year: false,
  });

  // Initialize price range when filter options load
  useEffect(() => {
    if (filterOptions?.priceRange) {
      setPriceRange({
        min: filterOptions.priceRange.min || 0,
        max: filterOptions.priceRange.max || 0,
      });
    }
  }, [filterOptions]);

  // Reset to page 1 when debounced search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // Build filters object
  const filters = {
    page: currentPage,
    limit: 12,
    search: debouncedSearchQuery,
    minPrice: priceRange.min > 0 ? priceRange.min : undefined,
    maxPrice: priceRange.max > 0 ? priceRange.max : undefined,
    categoryIds: selectedCategories,
    productTypeIds: selectedProductTypes,
    brandLogoIds: selectedBrands,
    colorIds: selectedColors,
    countryIds: selectedCountries,
    yearIds: selectedYears,
    sortBy,
    sortOrder,
  };

  // Fetch products
  const { products, pagination, loading } = useProducts(filters);

  // Toggle accordion
  const toggleFilter = filterName => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // Handle filter changes
  const handleCategoryToggle = id => {
    setSelectedCategories(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    setCurrentPage(1);
  };

  const handleProductTypeToggle = id => {
    setSelectedProductTypes(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    setCurrentPage(1);
  };

  const handleBrandToggle = id => {
    setSelectedBrands(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    setCurrentPage(1);
  };

  const handleColorToggle = id => {
    setSelectedColors(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    setCurrentPage(1);
  };

  const handleCountryToggle = id => {
    setSelectedCountries(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    setCurrentPage(1);
  };

  const handleYearToggle = id => {
    setSelectedYears(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleSortChange = e => {
    const value = e.target.value;
    if (value === 'price-asc') {
      setSortBy('price');
      setSortOrder('asc');
    } else if (value === 'price-desc') {
      setSortBy('price');
      setSortOrder('desc');
    } else if (value === 'name-asc') {
      setSortBy('name');
      setSortOrder('asc');
    } else if (value === 'name-desc') {
      setSortBy('name');
      setSortOrder('desc');
    } else {
      setSortBy('order');
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('order');
    setSortOrder('asc');
    setPriceRange({ min: 0, max: filterOptions?.priceRange?.max || 0 });
    setSelectedCategories([]);
    setSelectedProductTypes([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedCountries([]);
    setSelectedYears([]);
    setCurrentPage(1);
  };

  // Count selected filters for badges
  const getFilterCount = filterName => {
    switch (filterName) {
      case 'category':
        return selectedCategories.length;
      case 'productType':
        return selectedProductTypes.length;
      case 'brand':
        return selectedBrands.length;
      case 'color':
        return selectedColors.length;
      case 'country':
        return selectedCountries.length;
      case 'year':
        return selectedYears.length;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero Section */}
      <ProductsHero settings={settings} />

      {/* Main Content - Two Column Layout */}
      <section className="w-full py-8 md:py-12">
        <div className="mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Column */}
            <ProductsFilters
              filterOptions={filterOptions}
              expandedFilters={expandedFilters}
              toggleFilter={toggleFilter}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategories={selectedCategories}
              selectedProductTypes={selectedProductTypes}
              selectedBrands={selectedBrands}
              selectedColors={selectedColors}
              selectedCountries={selectedCountries}
              selectedYears={selectedYears}
              handleCategoryToggle={handleCategoryToggle}
              handleProductTypeToggle={handleProductTypeToggle}
              handleBrandToggle={handleBrandToggle}
              handleColorToggle={handleColorToggle}
              handleCountryToggle={handleCountryToggle}
              handleYearToggle={handleYearToggle}
              resetFilters={resetFilters}
              getFilterCount={getFilterCount}
              getImageUrl={getImageUrl}
            />

            {/* Products Column */}
            <main className={`flex-1 lg:w-2/3 ${isRTL ? 'lg:order-2' : ''}`}>
              {/* Search and Sort Bar */}
              <ProductsSearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
                handleSearch={handleSearch}
              />

              {/* Products Grid */}
              <ProductsGrid products={products} loading={loading} getImageUrl={getImageUrl} />

              {/* Pagination */}
              <ProductsPagination pagination={pagination} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
