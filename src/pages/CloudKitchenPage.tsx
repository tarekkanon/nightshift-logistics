import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChefHat, Clock, MapPin, Phone, Mail, Check, Star, Truck, Shield, Zap, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';

export default function CloudKitchenPage() {
  const [scrolled, setScrolled] = useState(false);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    serviceNeeded: 'inventory-transfer',
    deliveryFrequency: 'daily'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);

  // Google Analytics tracking function
  const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const enrichedParams = {
        ...eventParams,
        page_type: 'cloud_kitchen_landing',
        timestamp: new Date().toISOString()
      };
      (window as any).gtag('event', eventName, enrichedParams);
      console.log('GA4 Event:', eventName, enrichedParams);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      setStickyBarVisible(window.scrollY > 800);

      // Track scroll depth
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 25 && scrollPercent < 26) trackEvent('scroll_depth', { depth: '25%' });
      if (scrollPercent >= 50 && scrollPercent < 51) trackEvent('scroll_depth', { depth: '50%' });
      if (scrollPercent >= 75 && scrollPercent < 76) trackEvent('scroll_depth', { depth: '75%' });
      if (scrollPercent >= 95) trackEvent('scroll_depth', { depth: '100%' });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      setTimeOnPage(seconds);
      if (seconds === 10) trackEvent('time_on_page', { duration: '10_seconds' });
      else if (seconds === 30) trackEvent('time_on_page', { duration: '30_seconds' });
      else if (seconds === 60) trackEvent('time_on_page', { duration: '1_minute' });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone) {
      return;
    }

    setIsSubmitting(true);

    trackEvent('form_submit_attempt', {
      service_needed: formData.serviceNeeded,
      delivery_frequency: formData.deliveryFrequency
    });

    try {
      const GOOGLE_FORM_ID = '1FAIpQLSe1YjENgyvJMpYh6Y2sMgN8pYjbW2Qbtl115l-wJY3h317tdA';
      const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

      const googleFormData = new FormData();
      googleFormData.append('entry.217249241', `${formData.businessName} - ${formData.contactName}`);
      googleFormData.append('entry.790939879', formData.email);
      googleFormData.append('entry.1529377917', formData.phone);
      googleFormData.append('entry.238706534', formData.location || 'Cloud Kitchen - Dubai');
      googleFormData.append('entry.736039756', `Service: ${formData.serviceNeeded} | Frequency: ${formData.deliveryFrequency}`);
      googleFormData.append('entry.528042288', 'Cloud Kitchen Service');

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors'
      });

      trackEvent('form_submit_success', {
        business_name: formData.businessName,
        service_needed: formData.serviceNeeded
      });

      trackEvent('generate_lead', {
        value: 1,
        currency: 'AED',
        lead_type: 'cloud_kitchen'
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          businessName: '',
          contactName: '',
          email: '',
          phone: '',
          location: '',
          serviceNeeded: 'inventory-transfer',
          deliveryFrequency: 'daily'
        });
      }, 10000);

    } catch (error) {
      trackEvent('form_submit_error', { error_message: (error as Error).message });
      setIsSubmitting(false);
      alert('Something went wrong. Please try calling us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Night Delivery for Cloud Kitchens Dubai",
    "serviceType": "Cloud Kitchen Delivery Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NightShift Logistics",
      "url": "https://night-shiftlogistics.com",
      "logo": "https://night-shiftlogistics.com/logo.png",
      "image": "https://night-shiftlogistics.com/cloud-kitchen-delivery.jpg",
      "telephone": "+971565108183",
      "email": "order@night-shiftlogistics.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      },
      "priceRange": "AED 60-300",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "18:00",
          "closes": "02:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ]
    },
    "areaServed": {
      "@type": "State",
      "name": "United Arab Emirates"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "15"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": "60",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "60",
        "priceCurrency": "AED",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitText": "delivery"
        }
      }
    }
  };

  return (
    <>
      <SEO
        title="Night Delivery for Cloud Kitchens Dubai | Restaurant Supply Transport UAE | NightShift Logistics"
        description="Specialized night & weekend delivery for cloud kitchens in Dubai. Move inventory between branches, receive supplies after hours. 6 PM-2 AM service across all UAE. No disruption to peak hours."
        keywords="cloud kitchen delivery dubai, restaurant supply transport uae, night delivery food business, inter-branch inventory transfer, ghost kitchen logistics, dark kitchen delivery, food business cargo dubai"
        canonical="https://night-shiftlogistics.com/cloud-kitchen"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${scrolled ? 'bg-white' : 'bg-white'}`}>
                  <ChefHat className={scrolled ? 'w-7 h-7 text-orange-600' : 'w-7 h-7 text-orange-600'} />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${scrolled ? 'text-slate-900' : 'text-white'}`}>NightShift Logistics</h1>
                  <p className={`text-sm font-medium ${scrolled ? 'text-orange-600' : 'text-orange-300'}`}>Cloud Kitchen Specialists</p>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#solutions" className={`${scrolled ? 'text-slate-700 hover:text-orange-600' : 'text-white hover:text-orange-300'} font-medium transition-colors`}>Solutions</a>
                <a href="#pricing" className={`${scrolled ? 'text-slate-700 hover:text-orange-600' : 'text-white hover:text-orange-300'} font-medium transition-colors`}>Pricing</a>
                <a href="#testimonials" className={`${scrolled ? 'text-slate-700 hover:text-orange-600' : 'text-white hover:text-orange-300'} font-medium transition-colors`}>Testimonials</a>
                <a href="#contact" className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">Get Free Quote</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Sticky Bottom Bar */}
        {stickyBarVisible && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-4 shadow-2xl z-50 animate-slide-up">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-bold text-lg">Ready to optimize your cloud kitchen deliveries?</p>
                <p className="text-sm text-orange-100">Get a custom quote in under 5 minutes</p>
              </div>
              <div className="flex gap-3">
                <a href="#contact" onClick={() => trackEvent('button_click', { button_name: 'Get Free Quote', button_location: 'sticky_bar' })} className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-orange-50 transition-all">Get Free Quote</a>
                <a href="tel:+971565108183" onClick={() => trackEvent('phone_click', { click_location: 'sticky_bar' })} className="bg-orange-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-800 transition-all flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl -top-48 -left-24 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-orange-400/20 rounded-full blur-3xl top-1/2 -right-24 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  <ChefHat className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Trusted by 15+ Cloud Kitchens Across UAE</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Stop Losing Hours to <span className="text-yellow-300">Daytime Deliveries</span>
                </h1>

                <p className="text-2xl text-orange-100 leading-relaxed">
                  Move inventory between branches, receive supplies, transfer equipment—<strong className="text-white"> all during your off-peak hours.</strong>
                </p>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <p className="text-yellow-300 font-bold text-lg mb-3">The Cloud Kitchen Problem:</p>
                  <ul className="space-y-2 text-white">
                    {[
                      'Suppliers arrive during your busiest lunch/dinner rush',
                      'Inter-branch transfers disrupt operations',
                      'No reliable night delivery options',
                      'Equipment breakdowns need immediate solutions'
                    ].map((problem, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Bell className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                        <span>{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href="#contact" onClick={() => trackEvent('button_click', { button_name: 'Get Free Quote', button_location: 'hero' })} className="group bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 hover:shadow-2xl transition-all transform hover:scale-105">
                    <span>Get Free Quote</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                  <a href="https://wa.me/971565108183?text=Hello%20NightShift%2C%20I%27m%20interested%20in%20cloud%20kitchen%20delivery%20services" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { click_location: 'hero' })} className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 hover:bg-green-700 transition-all">
                    <Phone className="w-5 h-5" />
                    <span>WhatsApp Now</span>
                  </a>
                  <a href="tel:+971565108183" onClick={() => trackEvent('phone_click', { click_location: 'hero' })} className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 border border-white/30 hover:bg-white/20 transition-all">
                    <Phone className="w-5 h-5" />
                    <span>Call Direct</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-4">
                  {['No Setup Fees', 'Same-Day Start', 'All 7 Emirates'].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-300" />
                      <span className="text-white font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-2xl">
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-pulse">
                    Owner-Operated
                  </div>

                  <div className="space-y-6">
                    {[
                      { icon: Clock, stat: '6PM-2AM', label: 'Night Operations', subtext: 'Zero disruption to peak hours' },
                      { icon: Truck, stat: '15+', label: 'Cloud Kitchens Served', subtext: 'Across Dubai, Sharjah, Abu Dhabi' },
                      { icon: Shield, stat: '< 2 Hours', label: 'Response Time', subtext: 'Direct owner communication' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all transform hover:scale-105">
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-xl shadow-lg">
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-white">{item.stat}</p>
                          <p className="text-white font-semibold">{item.label}</p>
                          <p className="text-orange-200 text-sm">{item.subtext}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-slate-900 to-orange-900 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-300">
              {[
                { icon: Clock, text: '6PM-2AM + Full Weekends' },
                { icon: ChefHat, text: '15+ Kitchen Partners' },
                { icon: Shield, text: 'Owner-Operated Service' },
                { icon: MapPin, text: 'All 7 Emirates Coverage' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <item.icon className="w-5 h-5 text-orange-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <section id="solutions" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">NightShift Solution</span>
              </h2>
              <p className="text-xl text-slate-600">Built specifically for cloud kitchen operations</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Night & Weekend Deliveries',
                  desc: 'We operate 6 PM-2 AM on weekdays and full weekends. Receive supplies, move inventory, transfer equipment—all when your kitchen is closed or slow.',
                  icon: Clock,
                  benefit: 'Zero disruption to peak hours'
                },
                {
                  title: 'Inter-Branch Transfers',
                  desc: 'Running low on ingredients at one location? We move inventory between your branches during off-peak hours. Same-night service available.',
                  icon: Truck,
                  benefit: 'Keep all kitchens stocked'
                },
                {
                  title: 'Emergency Response',
                  desc: 'Equipment breakdown? Urgent supply needed? Talk directly to the owner, get immediate decisions, and fast service—even at midnight.',
                  icon: Zap,
                  benefit: '< 2 hour response time'
                },
                {
                  title: 'Owner-Operated',
                  desc: 'No call centers, no ticket systems. WhatsApp or call the owner directly. Real person, instant answers, same-day solutions.',
                  icon: Phone,
                  benefit: 'Direct communication line'
                },
                {
                  title: 'All-UAE Coverage',
                  desc: 'Kitchens in Dubai, Sharjah, and Abu Dhabi? We cover all 7 Emirates with reliable night service. One partner for all locations.',
                  icon: MapPin,
                  benefit: 'Single vendor, full coverage'
                },
                {
                  title: 'Flexible & Scalable',
                  desc: 'From weekly scheduled runs to daily operations. Pay per delivery or volume discounts. No long-term contracts. Grow as you grow.',
                  icon: TrendingUp,
                  benefit: 'Adapt to your business'
                }
              ].map((solution, idx) => (
                <article key={idx} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <solution.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{solution.title}</h3>
                  <p className="text-slate-700 leading-relaxed mb-4">{solution.desc}</p>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-semibold text-sm">{solution.benefit}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-slate-600">Pay per delivery or get volume discounts</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              {[
                {
                  title: 'Night Service',
                  time: '6 PM - 2 AM Weekdays',
                  price: 'AED 60',
                  perKm: 'AED 1.5/km',
                  features: ['Within Emirate deliveries', 'Perfect for daily operations', 'Live tracking updates', 'Photo proof of delivery', 'Direct owner contact'],
                  popular: false
                },
                {
                  title: 'Weekend Service',
                  time: 'Saturday & Sunday',
                  price: 'AED 72',
                  perKm: 'AED 1.7/km',
                  features: ['Full weekend coverage', 'Flexible time slots', 'Inter-branch transfers', 'Emergency response', 'Priority scheduling'],
                  popular: true
                }
              ].map((plan, idx) => (
                <div key={idx} className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 ${plan.popular ? 'border-orange-500 shadow-orange-200' : 'border-slate-200'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.title}</h3>
                    <p className="text-slate-600 mb-4">{plan.time}</p>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">{plan.price}</span>
                      <span className="text-slate-600"> base</span>
                    </div>
                    <p className="text-slate-600 font-semibold">+ {plan.perKm}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Sample Routes */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200 max-w-4xl mx-auto mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Sample Routes & Pricing (Night Service)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { route: 'JLT → Business Bay', distance: '12 km', price: 'AED 78' },
                  { route: 'Dubai Marina → Downtown', distance: '15 km', price: 'AED 83' },
                  { route: 'Dubai → Sharjah', distance: '30 km', price: 'AED 135' },
                  { route: 'Dubai → Abu Dhabi', distance: '140 km', price: 'AED 300' }
                ].map((sample, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-900">{sample.route}</p>
                      <p className="text-sm text-slate-600">{sample.distance}</p>
                    </div>
                    <p className="text-xl font-bold text-orange-600">{sample.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Volume Discounts */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-8 max-w-3xl mx-auto border-2 border-orange-300">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Volume Discounts Available</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { volume: '20-49 /month', discount: '10% off' },
                    { volume: '50-99 /month', discount: '15% off' },
                    { volume: '100+ /month', discount: 'Custom pricing' }
                  ].map((tier, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4">
                      <p className="text-slate-900 font-bold mb-1">{tier.volume}</p>
                      <p className="text-orange-600 font-bold text-xl">{tier.discount}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact" onClick={() => trackEvent('button_click', { button_name: 'Request Custom Pricing', button_location: 'pricing' })} className="inline-flex items-center space-x-2 mt-6 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                  <span>Request Custom Pricing</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by Cloud Kitchens Across UAE</h2>
              <div className="flex justify-center items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600">4.9/5 from 15+ cloud kitchen operators</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  quote: 'Finally, a delivery partner who gets it. They move our inventory between JLT and Business Bay every night at 11 PM. Zero disruption to operations. Game changer.',
                  author: 'Ahmed K.',
                  company: 'Multi-Brand Cloud Kitchen',
                  location: 'Dubai',
                  frequency: '6 deliveries/week'
                },
                {
                  quote: 'Our fridge died at 9 PM on Friday. Called NightShift, they had emergency supplies at our door by 10:30 PM. Saved us thousands in lost revenue.',
                  author: 'Priya M.',
                  company: 'Indian Food Concept',
                  location: 'Sharjah',
                  frequency: '3-4 deliveries/week'
                },
                {
                  quote: 'No more dealing with suppliers during lunch rush. All our ingredient deliveries happen after midnight now. Our kitchen runs so much smoother.',
                  author: 'Marco R.',
                  company: 'Italian Kitchen Brand',
                  location: 'Dubai Marina',
                  frequency: 'Daily service'
                }
              ].map((testimonial, idx) => (
                <article key={idx} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 shadow-lg border-2 border-orange-200">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic leading-relaxed text-lg">"{testimonial.quote}"</p>
                  <div className="border-t-2 border-orange-200 pt-4">
                    <p className="font-bold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">{testimonial.company}</p>
                    <p className="text-xs text-slate-500">{testimonial.location}</p>
                    <p className="text-xs text-orange-600 font-semibold mt-1">{testimonial.frequency}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center">
              <a href="#contact" onClick={() => trackEvent('button_click', { button_name: 'Schedule Consultation', button_location: 'testimonials' })} className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all">
                <span>Schedule a Consultation</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-20 px-4 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Get Your Custom Quote</h2>
              <p className="text-xl text-orange-100">Tell us about your cloud kitchen needs. We'll respond within 2 hours with custom pricing.</p>
            </div>

            {!isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/30 shadow-2xl">
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="businessName" className="block text-white font-semibold mb-2">Business Name <span className="text-red-300">*</span></label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="Your cloud kitchen name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactName" className="block text-white font-semibold mb-2">Contact Name <span className="text-red-300">*</span></label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="email" className="block text-white font-semibold mb-2">Email <span className="text-red-300">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-white font-semibold mb-2">Phone <span className="text-red-300">*</span></label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="location" className="block text-white font-semibold mb-2">Kitchen Location(s)</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="e.g., JLT, Business Bay, Dubai Marina"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="serviceNeeded" className="block text-white font-semibold mb-2">Service Needed</label>
                      <select
                        id="serviceNeeded"
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={handleChange}
                        className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <option value="inventory-transfer" className="text-slate-900">Inter-Branch Inventory Transfer</option>
                        <option value="supplier-delivery" className="text-slate-900">Supplier Deliveries (Night)</option>
                        <option value="equipment-move" className="text-slate-900">Equipment/Asset Transport</option>
                        <option value="emergency" className="text-slate-900">Emergency Response Service</option>
                        <option value="multiple" className="text-slate-900">Multiple Services</option>
                        <option value="other" className="text-slate-900">Other (Will Discuss)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="deliveryFrequency" className="block text-white font-semibold mb-2">Expected Frequency</label>
                      <select
                        id="deliveryFrequency"
                        name="deliveryFrequency"
                        value={formData.deliveryFrequency}
                        onChange={handleChange}
                        className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <option value="daily" className="text-slate-900">Daily (5-7 times/week)</option>
                        <option value="weekly" className="text-slate-900">Few Times Weekly (2-4)</option>
                        <option value="monthly" className="text-slate-900">Monthly (5-10 times)</option>
                        <option value="occasional" className="text-slate-900">Occasional/As-Needed</option>
                        <option value="unsure" className="text-slate-900">Not Sure Yet</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Get My Custom Quote'}</span>
                    {!isSubmitting && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    )}
                  </button>

                  <p className="text-orange-100 text-sm text-center mt-4">🔒 Your information is secure. We'll respond within 2 hours with custom pricing.</p>
                </form>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-white text-center mb-4 font-semibold">Or contact us directly:</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="tel:+971565108183" onClick={() => trackEvent('phone_click', { click_location: 'contact_form' })} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold text-white hover:bg-white/30 transition-all">
                      <Phone className="w-5 h-5" />
                      <span>+971 56 510 8183</span>
                    </a>
                    <a href="https://wa.me/971565108183?text=Hello%20NightShift%2C%20I%27m%20interested%20in%20cloud%20kitchen%20delivery%20services" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { click_location: 'contact_form' })} className="flex items-center space-x-2 bg-green-600 px-6 py-3 rounded-lg font-semibold text-white hover:bg-green-700 transition-all">
                      <span>WhatsApp Us</span>
                    </a>
                    <a href="mailto:order@night-shiftlogistics.com" className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold text-white hover:bg-white/30 transition-all">
                      <Mail className="w-5 h-5" />
                      <span>Email Us</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mb-6 animate-pulse">
                  <Check className="w-16 h-16 text-green-300" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Quote Request Received!</h3>
                <p className="text-xl text-orange-100 mb-6">Thank you! We'll contact you within 2 hours with custom pricing for your cloud kitchen.</p>
                <p className="text-orange-200">Check your email and phone for our response.</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-12 px-4 border-t border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">NightShift</span>
                </div>
                <p className="text-slate-400 text-sm">Specialized night & weekend delivery for cloud kitchens across UAE. Operating 6 PM-2 AM + full weekends.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {['Solutions', 'Pricing', 'Testimonials', 'Get Quote'].map(link => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-slate-400 hover:text-orange-400 text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-orange-400" />
                    <a href="tel:+971565108183" className="text-slate-400 text-sm hover:text-orange-400 transition-colors">+971 56 510 8183</a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-orange-400" />
                    <a href="mailto:order@night-shiftlogistics.com" className="text-slate-400 text-sm hover:text-orange-400 transition-colors">order@night-shiftlogistics.com</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Service Hours</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>🌙 Weekdays: 6 PM - 2 AM</li>
                  <li>📅 Weekends: Full Coverage</li>
                  <li>📞 Support: 24/7</li>
                  <li className="text-orange-400 font-semibold mt-3">Serving All 7 Emirates</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800 text-center">
              <p className="text-slate-500 text-sm">© 2025 NightShift Logistics. Professional Night & Weekend Delivery for Cloud Kitchens in Dubai, UAE.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
