import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import EcommercePage from './pages/EcommercePage';
import CloudKitchenPage from './pages/CloudKitchenPage';
import RatesPage from './pages/RatesPage';
import DriverAppPage from './pages/DriverAppPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ecommerce" element={<EcommercePage />} />
          <Route path="/cloud-kitchen" element={<CloudKitchenPage />} />
          <Route path="/rates" element={<RatesPage />} />
          <Route path="/driver-app" element={<DriverAppPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
