import React from 'react';
import { Moon, Clock, MapPin, CheckCircle, ArrowLeft, Package, TrendingUp, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function RatesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Night & Weekend Delivery Pricing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NightShift Logistics",
      "url": "https://night-shiftlogistics.com",
      "telephone": "+971565108183",
      "priceRange": "AED 40-150"
    },
    "areaServed": [
      {"@type": "City", "name": "Dubai"},
      {"@type": "City", "name": "Abu Dhabi"},
      {"@type": "City", "name": "Sharjah"},
      {"@type": "City", "name": "Ajman"},
      {"@type": "City", "name": "Ras Al Khaimah"},
      {"@type": "City", "name": "Fujairah"},
      {"@type": "City", "name": "Umm Al Quwain"}
    ]
  };

  return (
    <>
      <SEO
        title="Night & Weekend Delivery Rates UAE | Transparent Pricing All Emirates | NightShift Logistics"
        description="Clear, transparent pricing for night and weekend delivery across all UAE Emirates. No hidden fees. E-commerce from AED 40, Cloud Kitchen from AED 60. Volume discounts available."
        keywords="delivery rates UAE, night delivery pricing UAE, weekend delivery cost UAE, logistics pricing Dubai Abu Dhabi Sharjah, cargo rates UAE, transparent delivery pricing, delivery cost all emirates"
        canonical="https://night-shiftlogistics.com/rates"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <nav className="bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-cyan-300 hover:text-cyan-400 transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <a href="tel:+971565108183" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              Get Custom Quote
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-400/30 mb-6">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 font-semibold">Transparent Pricing • No Hidden Fees</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Simple, Honest Pricing for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Night & Weekend Delivery
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Clear rates for delivery across all 7 UAE Emirates. Pay per delivery with volume discounts available. No setup fees, no contracts.
            </p>
            <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
              {[
                { icon: CheckCircle, text: 'No Setup Fees' },
                { icon: CheckCircle, text: 'No Hidden Charges' },
                { icon: CheckCircle, text: 'Volume Discounts' },
                { icon: CheckCircle, text: 'All 7 Emirates' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-cyan-300">
                  <item.icon className="w-5 h-5" />
                  <span className="font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Pricing Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* E-Commerce Pricing */}
              <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm p-8 rounded-2xl border-2 border-blue-400/40 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">E-Commerce</h3>
                  </div>
                  <Link to="/ecommerce" className="text-blue-300 hover:text-blue-200 text-sm font-semibold underline">
                    Learn More →
                  </Link>
                </div>

                <div className="mb-6 pb-6 border-b border-blue-400/20">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AED 40</span>
                    <span className="text-slate-400 text-lg">base</span>
                  </div>
                  <div className="text-slate-300 text-lg mb-4">
                    + <strong className="text-cyan-300">AED 1.5/km</strong> (Night)
                  </div>
                  <div className="text-slate-300 text-lg">
                    + <strong className="text-cyan-300">AED 1.7/km</strong> (Weekend)
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    'Live tracking & updates',
                    'Photo proof of delivery',
                    'Customer signature capture',
                    'Owner-operated service',
                    'Same-day onboarding',
                    'No minimum orders'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-400/20">
                  <p className="text-blue-200 text-sm font-semibold mb-2">Example Pricing:</p>
                  <div className="space-y-1 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <span>JLT → Business Bay (12 km, Night):</span>
                      <strong className="text-cyan-300">AED 58</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Dubai → Sharjah (30 km, Weekend):</span>
                      <strong className="text-cyan-300">AED 91</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cloud Kitchen Pricing */}
              <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-sm p-8 rounded-2xl border-2 border-orange-400/40 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                      <Moon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Cloud Kitchen</h3>
                  </div>
                  <Link to="/cloud-kitchen" className="text-orange-300 hover:text-orange-200 text-sm font-semibold underline">
                    Learn More →
                  </Link>
                </div>

                <div className="mb-6 pb-6 border-b border-orange-400/20">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">AED 60</span>
                    <span className="text-slate-400 text-lg">base</span>
                  </div>
                  <div className="text-slate-300 text-lg mb-4">
                    + <strong className="text-orange-300">AED 1.5/km</strong> (Night)
                  </div>
                  <div className="text-slate-300 text-lg">
                    + <strong className="text-orange-300">AED 1.7/km</strong> (Weekend)
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    'Inter-branch transfers',
                    'Supplier deliveries',
                    'Equipment transport',
                    'Emergency response service',
                    'Flexible scheduling',
                    'Direct owner contact'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-400/20">
                  <p className="text-orange-200 text-sm font-semibold mb-2">Example Pricing:</p>
                  <div className="space-y-1 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <span>JLT → Business Bay (12 km, Night):</span>
                      <strong className="text-orange-300">AED 78</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Dubai → Abu Dhabi (140 km, Weekend):</span>
                      <strong className="text-orange-300">AED 298</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 mb-16">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Service Hours</h3>
                <p className="text-slate-400">When we operate across all 7 UAE Emirates</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-400/20">
                  <Clock className="w-10 h-10 text-cyan-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Night Service</h4>
                    <p className="text-cyan-300 text-2xl font-bold mb-2">6:00 PM - 2:00 AM</p>
                    <p className="text-slate-400">Monday to Friday</p>
                    <p className="text-slate-300 text-sm mt-2">Perfect for after-hours deliveries when traffic is minimal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/20">
                  <Moon className="w-10 h-10 text-purple-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Weekend Service</h4>
                    <p className="text-purple-300 text-2xl font-bold mb-2">Full Coverage</p>
                    <p className="text-slate-400">Saturday & Sunday</p>
                    <p className="text-slate-300 text-sm mt-2">Complete weekend delivery service with flexible time slots</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Volume Discounts */}
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-10 border-2 border-green-400/30 mb-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-semibold">Save More as You Scale</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Volume Discounts</h3>
                <p className="text-slate-300">The more you ship, the more you save</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { range: '20-49/month', discount: '10% off', color: 'from-blue-500 to-cyan-500' },
                  { range: '50-99/month', discount: '15% off', color: 'from-purple-500 to-pink-500' },
                  { range: '100-199/month', discount: '20% off', color: 'from-orange-500 to-red-500' },
                  { range: '200+/month', discount: 'Custom', color: 'from-green-500 to-emerald-500' }
                ].map((tier, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-xl p-6 border border-green-400/20 text-center hover:bg-slate-800/70 transition-all">
                    <p className="text-slate-300 font-semibold mb-2">{tier.range}</p>
                    <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${tier.color}`}>
                      {tier.discount}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a href="tel:+971565108183" className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all">
                  <span>Request Volume Pricing</span>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </a>
              </div>
            </div>

            {/* Coverage Map */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-2">We Cover All 7 UAE Emirates</h3>
                <p className="text-slate-300">One price structure for the entire UAE</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman',
                  'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Inter-Emirate'
                ].map((emirate, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 rounded-lg border border-cyan-400/20 hover:bg-cyan-500/20 transition-all">
                    <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                    <span className="text-white font-semibold">{emirate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-10">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Pricing FAQs</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    q: 'Are there any hidden fees?',
                    a: 'No. The price you see is what you pay: base rate + per km. No fuel surcharges, no weekend premiums beyond the stated rates, no surprises.'
                  },
                  {
                    q: 'Do you charge for waiting time?',
                    a: 'First 15 minutes are free. After that, AED 5 per 15 minutes. We always communicate wait times upfront.'
                  },
                  {
                    q: 'What about inter-Emirate deliveries?',
                    a: 'Same pricing structure applies! Base rate + per km regardless of which Emirates you\'re shipping between.'
                  },
                  {
                    q: 'How do volume discounts work?',
                    a: 'Discounts apply automatically based on your monthly volume. No need to commit upfront—we track and apply them as you scale.'
                  },
                  {
                    q: 'Is there a minimum order?',
                    a: 'No minimum orders required. Whether you need one delivery or one hundred, we\'re ready to serve you.'
                  },
                  {
                    q: 'Can I get a custom quote?',
                    a: 'Absolutely! Call us at +971 56 510 8183 or fill the quote form on our homepage for custom pricing based on your specific needs.'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                    <h4 className="text-lg font-bold text-cyan-300 mb-2">{faq.q}</h4>
                    <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-y border-cyan-500/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              No setup fees. No contracts. Start with a single delivery or request custom pricing for your volume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#quote" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all">
                <span>Get Instant Quote</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
              <a href="tel:+971565108183" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center justify-center space-x-2 border border-white/20 hover:bg-white/20 transition-all">
                <span>Call: +971 56 510 8183</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-8 px-4 border-t border-cyan-500/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-slate-400">
              <p className="mb-2">&copy; 2025 NightShift Logistics. All rights reserved.</p>
              <p className="text-sm text-slate-500">Professional night & weekend delivery across all 7 UAE Emirates</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
