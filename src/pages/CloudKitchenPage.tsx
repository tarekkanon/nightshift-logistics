import React from 'react';
import { ChefHat, Thermometer, Clock, Package, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function CloudKitchenPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Food Delivery Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NightShift Logistics",
      "url": "https://night-shiftlogistics.com"
    },
    "areaServed": "UAE",
    "description": "Temperature-controlled food delivery for cloud kitchens and restaurants in Dubai and UAE"
  };

  return (
    <>
      <SEO
        title="Cloud Kitchen Delivery Dubai | Temperature-Controlled Food Logistics"
        description="Specialized food delivery for cloud kitchens in Dubai. Temperature-controlled transport, insulated packaging, and fast delivery. Perfect for virtual restaurants."
        keywords="cloud kitchen delivery Dubai, food delivery logistics UAE, temperature controlled delivery, virtual restaurant delivery, ghost kitchen logistics Dubai"
        canonical="https://night-shiftlogistics.com/cloud-kitchen"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-slate-900 to-slate-900">
        {/* Header */}
        <nav className="bg-slate-900/95 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center gap-2 text-orange-300 hover:text-orange-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <ChefHat className="w-20 h-20 text-orange-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Cloud Kitchen Delivery
            </h1>
            <p className="text-xl text-orange-200 max-w-3xl mx-auto">
              Specialized delivery for virtual restaurants and cloud kitchens. Keep food fresh with our temperature-controlled logistics.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Thermometer, title: "Temperature Control", desc: "Insulated bags maintain food temperature" },
                { icon: Clock, title: "Quick Pickup", desc: "Drivers ready within 15 minutes" },
                { icon: Package, title: "Secure Packaging", desc: "Spill-proof and tamper-evident containers" },
                { icon: CheckCircle, title: "Multiple Pickups", desc: "Batch deliveries for efficiency" },
                { icon: ChefHat, title: "Kitchen Integration", desc: "Direct POS and order system integration" },
                { icon: Clock, title: "Peak Hour Support", desc: "Extra drivers during lunch & dinner rush" }
              ].map((feature, idx) => (
                <div key={idx} className="bg-gradient-to-br from-orange-800/30 to-slate-900 p-6 rounded-xl border border-orange-500/30">
                  <feature.icon className="w-12 h-12 text-orange-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-orange-200">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Partner with NightShift</h2>
            <p className="text-white/90 mb-8">Let us handle delivery while you focus on cooking amazing food</p>
            <Link to="/#quote" className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all">
              Start Delivering
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-8 px-4 border-t border-orange-500/30">
          <div className="max-w-7xl mx-auto text-center text-orange-300">
            <p>&copy; 2025 NightShift Logistics. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
