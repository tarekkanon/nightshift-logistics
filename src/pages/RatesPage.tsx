import React from 'react';
import { FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function RatesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Logistics Pricing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NightShift Logistics",
      "url": "https://night-shiftlogistics.com"
    },
    "areaServed": "UAE"
  };

  return (
    <>
      <SEO
        title="Delivery Rates & Pricing Dubai | NightShift Logistics"
        description="Transparent pricing for delivery services across UAE. View our rate card for same-day, night, and weekend delivery options. Volume discounts available."
        keywords="delivery rates Dubai, shipping prices UAE, logistics pricing Dubai, delivery cost UAE, cargo rates Dubai"
        canonical="https://night-shiftlogistics.com/rates"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-900 via-slate-900 to-slate-900">
        {/* Header */}
        <nav className="bg-slate-900/95 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center gap-2 text-green-300 hover:text-green-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <FileText className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              No hidden fees. Clear rates for all services across UAE.
            </p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic */}
              <div className="bg-gradient-to-br from-green-800/30 to-slate-900 p-8 rounded-xl border border-green-500/30">
                <h3 className="text-2xl font-bold text-white mb-2">Standard</h3>
                <div className="text-4xl font-bold text-green-400 mb-4">AED 25</div>
                <p className="text-green-200 mb-6">Within city limits</p>
                <ul className="space-y-3">
                  {[
                    "Up to 5kg",
                    "Next-day delivery",
                    "Basic tracking",
                    "Standard support"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-green-100">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Express */}
              <div className="bg-gradient-to-br from-green-600/30 to-slate-900 p-8 rounded-xl border-2 border-green-400 transform scale-105">
                <div className="bg-green-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Express</h3>
                <div className="text-4xl font-bold text-green-400 mb-4">AED 45</div>
                <p className="text-green-200 mb-6">Same-day delivery</p>
                <ul className="space-y-3">
                  {[
                    "Up to 10kg",
                    "Same-day delivery",
                    "Real-time tracking",
                    "Priority support",
                    "SMS notifications"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-green-100">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium */}
              <div className="bg-gradient-to-br from-green-800/30 to-slate-900 p-8 rounded-xl border border-green-500/30">
                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                <div className="text-4xl font-bold text-green-400 mb-4">Custom</div>
                <p className="text-green-200 mb-6">Enterprise solutions</p>
                <ul className="space-y-3">
                  {[
                    "Unlimited weight",
                    "Dedicated fleet",
                    "24/7 support",
                    "Custom integration",
                    "Volume discounts"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-green-100">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-green-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Additional Charges</h3>
            <div className="grid md:grid-cols-2 gap-4 text-green-200">
              <div>• Night delivery (8PM-8AM): +AED 10</div>
              <div>• Weekend delivery: +AED 15</div>
              <div>• Outside city limits: +AED 1/km</div>
              <div>• Wait time: AED 5/15min</div>
              <div>• COD collection: 3% of order value</div>
              <div>• Return pickup: 50% of delivery cost</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Quote?</h2>
            <p className="text-green-200 mb-8">Contact us for volume discounts and enterprise pricing</p>
            <Link to="/#quote" className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all">
              Get Custom Quote
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-8 px-4 border-t border-green-500/30">
          <div className="max-w-7xl mx-auto text-center text-green-300">
            <p>&copy; 2025 NightShift Logistics. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
