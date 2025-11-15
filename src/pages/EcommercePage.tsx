import React from 'react';
import { ShoppingCart, Package, Truck, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function EcommercePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "E-commerce Delivery Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NightShift Logistics",
      "url": "https://night-shiftlogistics.com"
    },
    "areaServed": "UAE",
    "description": "Specialized e-commerce delivery and last-mile logistics for online retailers in Dubai and UAE"
  };

  return (
    <>
      <SEO
        title="E-commerce Delivery Solutions Dubai | NightShift Logistics"
        description="Specialized last-mile delivery for e-commerce businesses in UAE. Same-day delivery, COD handling, returns management. Scale your online store with reliable logistics."
        keywords="ecommerce delivery Dubai, last mile delivery UAE, COD delivery Dubai, online store logistics, ecommerce shipping Dubai, returns management UAE"
        canonical="https://night-shiftlogistics.com/ecommerce"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900">
        {/* Header */}
        <nav className="bg-slate-900/95 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <ShoppingCart className="w-20 h-20 text-purple-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              E-commerce Delivery Solutions
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Power your online store with reliable, fast delivery across UAE. From same-day delivery to COD handling, we've got you covered.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Truck, title: "Same-Day Delivery", desc: "Get orders to customers within hours" },
                { icon: Package, title: "COD Collection", desc: "Cash on delivery with instant reconciliation" },
                { icon: Clock, title: "Real-time Tracking", desc: "Live updates for you and your customers" },
                { icon: CheckCircle, title: "Returns Management", desc: "Hassle-free reverse logistics" },
                { icon: Package, title: "Secure Packaging", desc: "Professional handling of all items" },
                { icon: Truck, title: "Bulk Discounts", desc: "Volume-based pricing for growing stores" }
              ].map((feature, idx) => (
                <div key={idx} className="bg-gradient-to-br from-purple-800/30 to-slate-900 p-6 rounded-xl border border-purple-500/30">
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-purple-200">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Scale Your E-commerce?</h2>
            <p className="text-white/90 mb-8">Contact us for custom pricing and integration options</p>
            <Link to="/#quote" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all">
              Get Started Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-8 px-4 border-t border-purple-500/30">
          <div className="max-w-7xl mx-auto text-center text-purple-300">
            <p>&copy; 2025 NightShift Logistics. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
