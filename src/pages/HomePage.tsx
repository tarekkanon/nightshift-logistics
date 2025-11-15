import React, { useState, useEffect } from 'react';
import { Truck, Clock, Moon, Package, MapPin, Phone, Mail, CheckCircle, ArrowRight, FileText, Smartphone, ShoppingCart, ChefHat } from 'lucide-react';
import SEO from '../components/SEO';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickup: '',
    delivery: '',
    packageSize: 'small'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async () => {
    if (formData.name && formData.email && formData.phone && formData.pickup && formData.delivery) {
      setIsSubmitting(true);

      try {
        const GOOGLE_FORM_ID = '1FAIpQLScUvVsq3KhDRudPQ4lWFPKA75Q6DCGiS2FsydtAuV4BXJ6grg';
        const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

        const ENTRY_NAME = 'entry.1894689618';
        const ENTRY_EMAIL = 'entry.60601163';
        const ENTRY_PHONE = 'entry.424067118';
        const ENTRY_PICKUP = 'entry.1108186906';
        const ENTRY_DELIVERY = 'entry.142342084';
        const ENTRY_PACKAGE = 'entry.74867768';

        const googleFormData = new FormData();
        googleFormData.append(ENTRY_NAME, formData.name);
        googleFormData.append(ENTRY_EMAIL, formData.email);
        googleFormData.append(ENTRY_PHONE, formData.phone);
        googleFormData.append(ENTRY_PICKUP, formData.pickup);
        googleFormData.append(ENTRY_DELIVERY, formData.delivery);
        googleFormData.append(ENTRY_PACKAGE, formData.packageSize);

        await fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          body: googleFormData,
          mode: 'no-cors'
        });

        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', pickup: '', delivery: '', packageSize: 'small' });
        }, 10000);

      } catch (error) {
        console.error('Error submitting form:', error);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', pickup: '', delivery: '', packageSize: 'small' });
        }, 10000);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Logistics and Delivery Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NightShift Logistics",
      "url": "https://night-shiftlogistics.com",
      "areaServed": "UAE"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceRange": "$$"
    }
  };

  return (
    <>
      <SEO
        title="NightShift Logistics - Dubai's 24/7 Night & Weekend Delivery Service"
        description="Premier after-hours cargo delivery across all 7 UAE Emirates. Fast, reliable night and weekend logistics solutions. Get instant quotes for same-day delivery."
        keywords="Dubai 24/7 delivery, night delivery UAE, weekend delivery Dubai, after hours cargo service, express delivery Dubai, same day delivery UAE, logistics Dubai, cargo van Dubai"
        canonical="https://night-shiftlogistics.com"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg animate-pulse">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Night Shift Logistics</h1>
                <p className="text-cyan-300 text-sm">Serving All 7 Emirates</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#services" className="text-cyan-300 hover:text-cyan-400 transition-colors">Services</a>
              <a href="#specialized" className="text-cyan-300 hover:text-cyan-400 transition-colors">Industries</a>
              <a href="#quote" className="text-cyan-300 hover:text-cyan-400 transition-colors">Get Quote</a>
              <a href="#resources" className="text-cyan-300 hover:text-cyan-400 transition-colors">Resources</a>
              <a href="#contact" className="text-cyan-300 hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-cyan-500/20 border border-cyan-400 rounded-full px-4 py-2">
                  <span className="text-cyan-300 font-medium flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Open 24/7 - Nights & Weekends
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Your Cargo
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> Never Sleeps</span>
                </h2>
                <p className="text-xl text-cyan-100">
                  Dubai's premier after-hours delivery service. When others close, we deliver. Serving all 7 Emirates with speed and reliability.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#quote" className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                    Get Instant Quote
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="tel:+971XXXXXXXX" className="bg-slate-800 text-cyan-300 border border-cyan-500 px-8 py-4 rounded-lg font-semibold hover:bg-slate-700 transition-all flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl p-8 border border-cyan-500/30 backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg">
                      <Clock className="w-8 h-8 text-cyan-400" />
                      <div>
                        <div className="text-white font-semibold">24/7 Availability</div>
                        <div className="text-cyan-300 text-sm">Including Fridays & Holidays</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg">
                      <MapPin className="w-8 h-8 text-cyan-400" />
                      <div>
                        <div className="text-white font-semibold">All 7 Emirates</div>
                        <div className="text-cyan-300 text-sm">Complete UAE Coverage</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg">
                      <Package className="w-8 h-8 text-cyan-400" />
                      <div>
                        <div className="text-white font-semibold">Same-Day Delivery</div>
                        <div className="text-cyan-300 text-sm">Express & Standard Options</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-4">Our Services</h3>
              <p className="text-cyan-300 text-lg">Comprehensive logistics solutions for your business</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Moon, title: "Night Delivery", desc: "8 PM - 8 AM operations when traffic is minimal" },
                { icon: Clock, title: "Weekend Service", desc: "Friday & Saturday delivery when others rest" },
                { icon: Package, title: "Express Cargo", desc: "Same-day and next-day delivery options" }
              ].map((service, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all group">
                  <service.icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold text-white mb-2">{service.title}</h4>
                  <p className="text-cyan-300">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Industries */}
        <section id="specialized" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-4">Specialized Solutions</h3>
              <p className="text-cyan-300 text-lg">Industry-specific delivery services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <a href="/ecommerce" className="bg-gradient-to-br from-purple-900/50 to-slate-900 p-8 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all group cursor-pointer">
                <ShoppingCart className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold text-white mb-2">E-commerce Delivery</h4>
                <p className="text-purple-300">Last-mile solutions for online stores</p>
              </a>

              <a href="/cloud-kitchen" className="bg-gradient-to-br from-orange-900/50 to-slate-900 p-8 rounded-xl border border-orange-500/30 hover:border-orange-400 transition-all group cursor-pointer">
                <ChefHat className="w-12 h-12 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold text-white mb-2">Cloud Kitchen</h4>
                <p className="text-orange-300">Temperature-controlled food delivery</p>
              </a>

              <a href="/rates" className="bg-gradient-to-br from-green-900/50 to-slate-900 p-8 rounded-xl border border-green-500/30 hover:border-green-400 transition-all group cursor-pointer">
                <FileText className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold text-white mb-2">Rate Card</h4>
                <p className="text-green-300">Transparent pricing for all services</p>
              </a>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote" className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-white mb-4">Get Instant Quote</h3>
              <p className="text-cyan-300 text-lg">Fill out the form and we'll respond within minutes</p>
            </div>

            {isSubmitted ? (
              <div className="bg-gradient-to-br from-green-900/50 to-slate-900 p-12 rounded-xl border border-green-500/50 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-white mb-2">Request Received!</h4>
                <p className="text-green-300">We'll contact you shortly with a quote.</p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-cyan-500/30">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400"
                  />
                  <select
                    name="packageSize"
                    value={formData.packageSize}
                    onChange={handleChange}
                    className="bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="small">Small Package</option>
                    <option value="medium">Medium Package</option>
                    <option value="large">Large Package</option>
                    <option value="pallet">Pallet</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    name="pickup"
                    placeholder="Pickup Location"
                    value={formData.pickup}
                    onChange={handleChange}
                    className="bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    name="delivery"
                    placeholder="Delivery Location"
                    value={formData.delivery}
                    onChange={handleChange}
                    className="bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Quote Now'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-8">Ready to Ship?</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="tel:+971XXXXXXXX" className="flex items-center gap-3 text-cyan-300 hover:text-cyan-400 transition-colors">
                <Phone className="w-6 h-6" />
                <span className="text-lg">+971 XX XXX XXXX</span>
              </a>
              <a href="mailto:info@night-shiftlogistics.com" className="flex items-center gap-3 text-cyan-300 hover:text-cyan-400 transition-colors">
                <Mail className="w-6 h-6" />
                <span className="text-lg">info@night-shiftlogistics.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-8 px-4 border-t border-cyan-500/30">
          <div className="max-w-7xl mx-auto text-center text-cyan-300">
            <p>&copy; 2025 NightShift Logistics. All rights reserved.</p>
            <p className="text-sm mt-2">Serving Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah & UAQ</p>
          </div>
        </footer>
      </div>
    </>
  );
}
