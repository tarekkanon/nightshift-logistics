import React, { useState, useEffect } from 'react';
import { Truck, Clock, Moon, Package, MapPin, Phone, Mail, CheckCircle, ArrowRight, FileText, Smartphone } from 'lucide-react';

export default function CargoLandingPage() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
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
            <a href="#quote" className="text-cyan-300 hover:text-cyan-400 transition-colors">Get Quote</a>
            <a href="#resources" className="text-cyan-300 hover:text-cyan-400 transition-colors">Resources</a>
            <a href="#contact" className="text-cyan-300 hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-48 -left-24 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-1/2 -right-24 animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-400/30">
                <Moon className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-300 font-semibold">Nights & Full Weekends</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                The UAE's Only
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  After-Hours Delivery
                </span>
                <span className="block text-white text-3xl mt-2">Across All 7 Emirates</span>
              </h2>
              
              <p className="text-xl text-slate-300">
                When others rest, we deliver. Specialized cargo van services operating 6 PM - 2 AM weekdays and full weekends across the entire UAE.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#quote" className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                  <span>Get Instant Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex gap-3">
                  <a href="tel:+971565108183" className="flex-1 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <Phone className="w-5 h-5" />
                    <span>Call</span>
                  </a>
                  <a href="https://wa.me/971565108183" target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600/20 backdrop-blur-sm text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 border border-green-500/30 hover:bg-green-600/30 transition-all duration-300">
                    <Phone className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce">
                  24/7 Support
                </div>
                <div className="space-y-6">
                  {[
                    { icon: Clock, title: 'Night Delivery', desc: '6 PM - 2 AM Weekdays' },
                    { icon: Package, title: 'Weekend Service', desc: 'Full weekend coverage' },
                    { icon: MapPin, title: 'All UAE', desc: 'All 7 Emirates covered' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2">
                      <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-3 rounded-lg">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Why Choose UAE-Wide Night & Weekend Delivery?</h3>
            <p className="text-slate-400 text-lg">We operate when traffic is light across all Emirates - from Dubai to Abu Dhabi, Sharjah to Fujairah</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Off-Peak Efficiency', desc: 'Faster inter-emirate routes with minimal traffic congestion during night hours across the UAE', color: 'from-cyan-500 to-blue-500' },
              { icon: Moon, title: 'UAE-Wide Coverage', desc: 'The only service operating across all 7 Emirates during nights and full weekends', color: 'from-blue-500 to-indigo-500' },
              { icon: CheckCircle, title: 'Reliable Service', desc: 'Professional cross-emirate handling with real-time tracking and updates', color: 'from-indigo-500 to-purple-500' }
            ].map((service, idx) => (
              <div key={idx} className="group bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className={`bg-gradient-to-br ${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:animate-pulse`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Section - NEW */}
      <div id="resources" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Resources & Tools</h3>
            <p className="text-slate-400 text-lg">Access our driver app and rate information</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Driver App Card */}
            <a href="./NightShift_Driver_App.html" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:animate-pulse">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3 text-center">Driver App</h4>
              <p className="text-slate-400 text-center mb-4">Log deliveries, track distance, capture proof of delivery, and manage your route efficiently</p>
              <div className="flex items-center justify-center text-cyan-400 font-semibold group-hover:text-cyan-300">
                <span>Access Driver App</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Rate Card */}
            <a href="./NightShift_Rate_Card.html" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:animate-pulse">
                  <FileText className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3 text-center">Rate Card</h4>
              <p className="text-slate-400 text-center mb-4">View our transparent pricing structure for night and weekend deliveries across all Emirates</p>
              <div className="flex items-center justify-center text-blue-400 font-semibold group-hover:text-blue-300">
                <span>View Rate Card</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Quote Form Section */}
      <div id="quote" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 md:p-12 rounded-2xl border border-cyan-400/30 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-white mb-4">Get Your Instant Quote</h3>
              <p className="text-slate-400">Fill in the details and we'll get back to you within minutes</p>
            </div>
            
            {!isSubmitted ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-cyan-300 font-semibold mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-300 font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-cyan-300 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-cyan-300 font-semibold mb-2">Pickup Location</label>
                  <input
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    placeholder="Enter pickup address (any Emirate)"
                  />
                </div>
                
                <div>
                  <label className="block text-cyan-300 font-semibold mb-2">Delivery Location</label>
                  <input
                    type="text"
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    placeholder="Enter delivery address (any Emirate)"
                  />
                </div>
                
                <div>
                  <label className="block text-cyan-300 font-semibold mb-2">Package Size</label>
                  <select
                    name="packageSize"
                    value={formData.packageSize}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  >
                    <option value="small">Small (Up to 5 kg)</option>
                    <option value="mid">Medium (5-15 kg)</option>
                    <option value="large">Large (15-30 kg)</option>
                    <option value="xlarge">Extra Large (30+ kg)</option>
                    <option value="others">Other</option>
                  </select>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Request Quote Now'}</span>
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Quote Request Received!</h4>
                <p className="text-slate-400">Our team will contact you within 5 minutes with your personalized quote.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Coverage Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">We Cover All 7 Emirates</h3>
            <p className="text-slate-400 text-lg">Seamless night and weekend delivery across the entire UAE</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman',
              'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'
            ].map((emirate, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 text-center">
                <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold text-lg">{emirate}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Night Shift Logistics</span>
              </div>
              <p className="text-slate-400">The UAE's trusted night and weekend cargo delivery service across all 7 Emirates.</p>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Contact Us</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-400">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <a href="tel:+971565108183" className="hover:text-cyan-400 transition-colors">+971 56 510 8183</a>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <a href="mailto:info@nightshift.ae" className="hover:text-cyan-400 transition-colors">info@nightshift.ae</a>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>Based in Dubai, Serving All UAE</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Operating Hours</h5>
              <div className="space-y-2 text-slate-400">
                <p><strong className="text-cyan-300">Weekdays:</strong> 6:00 PM - 2:00 AM</p>
                <p><strong className="text-cyan-300">Weekends:</strong> Full Coverage</p>
                <p className="text-cyan-400 font-semibold mt-3">24/7 Customer Support</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; 2025 Night Shift Logistics. All rights reserved. | Delivering across all 7 Emirates when others rest.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
