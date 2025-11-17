import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const EcommercePage = lazy(() => import('./pages/EcommercePage'));
const CloudKitchenPage = lazy(() => import('./pages/CloudKitchenPage'));
const RatesPage = lazy(() => import('./pages/RatesPage'));
const DriverAppPage = lazy(() => import('./pages/DriverAppPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
      <p className="text-cyan-300 font-semibold">Loading...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
        <Route path="/cloud-kitchen" element={<CloudKitchenPage />} />
        <Route path="/rates" element={<RatesPage />} />
        <Route path="/driver-app" element={<DriverAppPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
