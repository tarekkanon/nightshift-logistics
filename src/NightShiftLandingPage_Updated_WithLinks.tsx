import React, { useState, useEffect } from 'react';
import { Truck, Clock, Moon, Package, MapPin, Phone, Mail, CheckCircle, ArrowRight, FileText, Smartphone, ShoppingCart, ChefHat } from 'lucide-react';

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
            <a href="#specialized" className="text-cyan-300 hover:text-cyan-400 transition-colors">Industries</a>
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
                    { icon: Moon, title: 'Weekend Coverage', desc: 'Full Saturday & Sunday Service' },
                    { icon: Package, title: 'All 7 Emirates', desc: 'UAE-Wide Coverage' }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-cyan-400/20 hover:bg-white/10 transition-all duration-300">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{feature.title}</h4>
                        <p className="text-cyan-300 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specialized Services Section - NEW */}
      <div id="specialized" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Industry-Specific Solutions</h3>
            <p className="text-slate-400 text-lg">Tailored night & weekend delivery services for your business needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* E-Commerce Card */}
            <a href="/NightShift_Ecommerce_Landing_Page.html" className="group relative bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                For E-Commerce
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-xl">
                  <ShoppingCart className="w-10 h-10 text-white" />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    Last-Mile Delivery
                  </h4>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Professional e-commerce delivery services with live tracking and proof of delivery. Perfect for online stores needing reliable after-hours fulfillment.
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-blue-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Live Tracking & Updates</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Proof of Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Owner-Operated Service</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                    <span>Learn More About E-Commerce Solutions</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>

            {/* Cloud Kitchen Card */}
            <a href="./NightShift_CloudKitchen_Landing.html" className="group relative bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-sm p-8 rounded-2xl border border-orange-400/30 hover:border-orange-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                For Restaurants
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl">
                  <ChefHat className="w-10 h-10 text-white" />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                    Cloud Kitchen Logistics
                  </h4>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Specialized delivery for restaurants and cloud kitchens. Move inventory between branches, receive supplies—all during off-peak hours without disrupting service.
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-orange-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Inter-Branch Transfers</span>
                    </div>
                    <div className="flex items-center space-x-2 text-orange-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">After-Hours Supply Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2 text-orange-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Equipment Transport</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-orange-400 font-semibold group-hover:text-orange-300 transition-colors">
                    <span>Learn More About Cloud Kitchen Solutions</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-lg mb-6">
              Not sure which service fits your needs? We're here to help!
            </p>
            <a href="#quote" className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Why Choose Night Shift Logistics</h3>
            <p className="text-slate-400 text-lg">The only cargo service in the UAE specialized in night and weekend deliveries</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'After-Hours Service',
                desc: 'Operating 6 PM - 2 AM on weekdays when traffic is minimal and roads are clear'
              },
              {
                icon: Moon,
                title: 'Full Weekend Coverage',
                desc: 'Complete delivery services throughout Saturday and Sunday across all Emirates'
              },
              {
                icon: Truck,
                title: 'Cargo Van Fleet',
                desc: 'Professional cargo vans equipped for packages, boxes, and freight of all sizes'
              },
              {
                icon: MapPin,
                title: 'UAE-Wide Service',
                desc: 'Delivering to all 7 Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, UAQ'
              },
              {
                icon: Package,
                title: 'Flexible Capacity',
                desc: 'From small packages to large cargo, we handle deliveries of all sizes'
              },
              {
                icon: CheckCircle,
                title: 'Reliable & Professional',
                desc: '24/7 customer support with real-time tracking and delivery confirmations'
              }
            ].map((service, idx) => (
              <div key={idx} className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg inline-block mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-slate-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div id="resources" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Essential Resources</h3>
            <p className="text-slate-400 text-lg">Everything you need to get started with Night Shift Logistics</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <a href="./NightShift_Rate_Card.html" className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Rate Card</h4>
                  <p className="text-slate-400 mb-4">View our transparent pricing for all Emirates and service types</p>
                  <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
                    <span>View Rates</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>

            <a href="./NightShift_Driver_App.html" className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Driver Portal</h4>
                  <p className="text-slate-400 mb-4">Real-time tracking and delivery management for our drivers</p>
                  <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
                    <span>Access Portal</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Quote Form Section */}
      <div id="quote" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Get Your Instant Quote</h3>
            <p className="text-slate-400 text-lg">Fill out the form below and we'll contact you within 5 minutes</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-2xl">
            {!isSubmitted ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-cyan-300 font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
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
                  <a href="mailto:order@night-shiftlogistics.com" className="hover:text-cyan-400 transition-colors">order@night-shiftlogistics.com</a>
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
