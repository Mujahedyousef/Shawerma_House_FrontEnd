import React from 'react';

import AppRoutes from './routes/AppRoutes';
import { useThemeSettings } from './hooks/useThemeSettings';
import ScrollToTop from './components/ScrollToTop';
import { CompareProvider } from './contexts/CompareContext';

const App = () => {
  useThemeSettings();

  return (
    <CompareProvider>
      <div className="min-h-screen">
        <ScrollToTop />
        <AppRoutes />
      </div>
    </CompareProvider>
  );
};

export default App;
