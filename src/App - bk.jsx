import React, { useState, useEffect } from 'react';
import { Truck, Clock, Moon, Package, MapPin, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function CargoLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    delivery: '',
    packageSize: 'small'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = () => {
    if (formData.name && formData.phone && formData.pickup && formData.delivery) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', pickup: '', delivery: '', packageSize: 'small' });
      }, 3000);
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
              <h1 className="text-2xl font-bold text-white">NightShift Logistics</h1>
              <p className="text-cyan-300 text-sm">Dubai's Night & Weekend Experts</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#services" className="text-cyan-300 hover:text-cyan-400 transition-colors">Services</a>
            <a href="#quote" className="text-cyan-300 hover:text-cyan-400 transition-colors">Get Quote</a>
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
                <span className="text-cyan-300 font-semibold">Available Nights & Weekends</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Dubai's Premier
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  After-Hours Delivery
                </span>
              </h2>
              
              <p className="text-xl text-slate-300">
                When others rest, we deliver. Specialized cargo van services for your night and weekend shipping needs across Dubai.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#quote" className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                  <span>Get Instant Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://wa.me/971XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                  <span>WhatsApp us Now</span>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce">
                  24/7 Support
                </div>
                <div className="space-y-6">
                  {[
                    { icon: Clock, title: 'Night Delivery', desc: 'Available 8 PM - 6 AM' },
                    { icon: Package, title: 'Weekend Service', desc: 'Friday & Saturday specialists' },
                    { icon: MapPin, title: 'All Dubai', desc: 'Complete UAE coverage' }
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
            <h3 className="text-4xl font-bold text-white mb-4">Why Choose Night & Weekend Delivery?</h3>
            <p className="text-slate-400 text-lg">We operate when traffic is light and your business needs flexibility</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Off-Peak Efficiency', desc: 'Faster routes with minimal traffic congestion during night hours', color: 'from-cyan-500 to-blue-500' },
              { icon: Moon, title: 'Flexible Scheduling', desc: 'Perfect for businesses needing after-hours or weekend logistics', color: 'from-blue-500 to-indigo-500' },
              { icon: CheckCircle, title: 'Reliable Service', desc: 'Professional handling with real-time tracking and updates', color: 'from-indigo-500 to-purple-500' }
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
                  <label className="block text-cyan-300 font-semibold mb-2">Pickup Location</label>
                  <input
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    placeholder="Enter pickup address in Dubai"
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
                    placeholder="Enter delivery address in Dubai"
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
                    <option value="medium">Medium (5-15 kg)</option>
                    <option value="large">Large (15-30 kg)</option>
                    <option value="xlarge">Extra Large (30+ kg)</option>
                  </select>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Request Quote Now</span>
                  <ArrowRight className="w-5 h-5" />
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

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">NightShift Logistics</span>
              </div>
              <p className="text-slate-400">Dubai's trusted night and weekend cargo delivery service.</p>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Contact Us</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-400">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span>+971 XX XXX XXXX</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span>info@nightshift.ae</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Operating Hours</h5>
              <div className="space-y-2 text-slate-400">
                <p>Nights: 8:00 PM - 6:00 AM</p>
                <p>Weekends: Friday & Saturday</p>
                <p className="text-cyan-400 font-semibold">24/7 Customer Support</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; 2025 NightShift Logistics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}