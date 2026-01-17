import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import PermissionProtectedRoute from './PermissionProtectedRoute';
import PublicLayout from '../components/layout/PublicLayout';

import { PRIVATE_ROUTES } from '../constants';

const LandingPage = lazy(() => import('../pages/Landing/LandingPage.jsx'));
const ProductsPage = lazy(() => import('../pages/Products/ProductsPage.jsx'));
const ProductDetailsPage = lazy(() => import('../pages/Products/ProductDetailsPage.jsx'));
const ComparePage = lazy(() => import('../pages/Products/ComparePage.jsx'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage.jsx'));
const ServicesPage = lazy(() => import('../pages/ServicesPage/ServicesPage.jsx'));
const TermsAndConditionsPage = lazy(() => import('../pages/TermsAndConditions/TermsAndConditionsPage.jsx'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage/ProjectsPage.jsx'));
const ProjectDetailsPage = lazy(() => import('../pages/Projects/ProjectDetailsPage.jsx'));
const BlogsPage = lazy(() => import('../pages/Blogs/BlogsPage.jsx'));
const BlogDetailsPage = lazy(() => import('../pages/Blogs/BlogDetailsPage.jsx'));
const AboutUsPage = lazy(() => import('../pages/AboutUs/AboutUsPage.jsx'));
const CareersPage = lazy(() => import('../pages/Careers/CareersPage.jsx'));
const JobDetailsPage = lazy(() => import('../pages/Careers/JobDetailsPage.jsx'));

const pageComponents = {
  LandingPage,
  ProductsPage,
  ProductDetailsPage,
  ComparePage,
  ContactPage,
  TermsAndConditionsPage,
  ServicesPage,
  ProjectsPage,
  ProjectDetailsPage,
  BlogsPage,
  BlogDetailsPage,
  AboutUsPage,
  CareersPage,
  JobDetailsPage,
};

export default PRIVATE_ROUTES?.map(route => {
  if (route?.permission) {
    return (
      <Route
        key={route?.key}
        path={route?.path}
        element={
          <PermissionProtectedRoute permission={route.permission}>
            <PublicLayout>
              {React.createElement(pageComponents[route?.element])}
            </PublicLayout>
          </PermissionProtectedRoute>
        }
      />
    );
  }

  // Otherwise, render normal route with PublicLayout
  return (
    <Route
      key={route?.key}
      path={route?.path}
      element={
        <PublicLayout>
          {React.createElement(pageComponents[route?.element])}
        </PublicLayout>
      }
    />
  );
});
