import React from 'react';
import { Smartphone, MapPin, Clock, Package, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function DriverAppPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NightShift Driver App",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Android, iOS",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "AED"
    }
  };

  return (
    <>
      <SEO
        title="Driver App - Real-Time Delivery Tracking | NightShift Logistics"
        description="Download the NightShift driver app for real-time delivery tracking, route optimization, and delivery logging. Available for iOS and Android."
        keywords="delivery driver app Dubai, logistics tracking app, driver delivery app UAE, route optimization app"
        canonical="https://night-shiftlogistics.com/driver-app"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900">
        {/* Header */}
        <nav className="bg-slate-900/95 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center gap-2 text-blue-300 hover:text-blue-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <Smartphone className="w-20 h-20 text-blue-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Driver App
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Streamline your deliveries with our powerful driver application. Track routes, log deliveries, and manage your workday efficiently.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: MapPin, title: "GPS Navigation", desc: "Optimized routes to save time and fuel" },
                { icon: Clock, title: "Time Tracking", desc: "Log pickup and delivery times automatically" },
                { icon: Package, title: "Delivery Logging", desc: "Photo proof and signature capture" },
                { icon: CheckCircle, title: "Status Updates", desc: "Real-time communication with dispatch" },
                { icon: Smartphone, title: "Offline Mode", desc: "Continue working without internet" },
                { icon: Package, title: "Earnings Tracker", desc: "Monitor your daily and weekly earnings" }
              ].map((feature, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-800/30 to-slate-900 p-6 rounded-xl border border-blue-500/30">
                  <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-blue-200">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Driver Network</h2>
            <p className="text-white/90 mb-8">Download the app and start earning with flexible hours</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-all flex items-center gap-2">
                <Smartphone className="w-6 h-6" />
                Download on iOS
              </button>
              <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-all flex items-center gap-2">
                <Smartphone className="w-6 h-6" />
                Download on Android
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-8 px-4 border-t border-blue-500/30">
          <div className="max-w-7xl mx-auto text-center text-blue-300">
            <p>&copy; 2025 NightShift Logistics. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
