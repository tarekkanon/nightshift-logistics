import React, { useState, useEffect } from 'react';
import {
  Truck, Shield, Clock, Phone, Mail, Check, Star, Zap, Users,
  Package, Target, ArrowRight, CheckCircle, TrendingUp, Heart
} from 'lucide-react';
import SEO from '../components/SEO';

// Google Analytics tracking helper
const trackEvent = (eventName: string, eventParams: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  delivery: string;
  packageSize: string;
}

export default function EcommercePage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    pickup: '',
    delivery: '',
    packageSize: 'small'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Analytics tracking states
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepthTracked, setScrollDepthTracked] = useState({
    '25': false,
    '50': false,
    '75': false,
    '100': false
  });
  const [sectionsViewed, setSectionsViewed] = useState<Set<string>>(new Set());

  // Comprehensive structured data for SEO
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://night-shiftlogistics.com",
      "name": "NightShift Logistics",
      "image": "https://night-shiftlogistics.com/images/logo.jpg",
      "description": "Professional last-mile delivery for e-commerce in Dubai. Owner-operated night & weekend delivery service with live updates and proof of delivery.",
      "url": "https://night-shiftlogistics.com",
      "telephone": "+971565108183",
      "email": "order@night-shiftlogistics.com",
      "priceRange": "AED 40-100",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dubai",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "25.2048",
        "longitude": "55.2708"
      },
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
      ],
      "sameAs": ["https://wa.me/971565108183"],
      "areaServed": [
        {"@type": "City", "name": "Dubai"},
        {"@type": "City", "name": "Abu Dhabi"},
        {"@type": "City", "name": "Sharjah"},
        {"@type": "City", "name": "Ajman"},
        {"@type": "City", "name": "Ras Al Khaimah"},
        {"@type": "City", "name": "Fujairah"},
        {"@type": "City", "name": "Umm Al Quwain"}
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Last Mile Delivery & E-Commerce Logistics",
      "provider": {
        "@type": "LocalBusiness",
        "name": "NightShift Logistics"
      },
      "areaServed": [
        {"@type": "City", "name": "Dubai"},
        {"@type": "City", "name": "Abu Dhabi"},
        {"@type": "City", "name": "Sharjah"},
        {"@type": "City", "name": "Ajman"},
        {"@type": "City", "name": "Ras Al Khaimah"},
        {"@type": "City", "name": "Fujairah"},
        {"@type": "City", "name": "Umm Al Quwain"}
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Delivery Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Night Deliveries",
              "description": "Professional night delivery service from 6 PM to 2 AM with zero traffic delays"
            },
            "price": "40",
            "priceCurrency": "AED"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Weekend Deliveries",
              "description": "Premium weekend delivery service with flexible time slots"
            },
            "price": "50",
            "priceCurrency": "AED"
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What areas do you serve in UAE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide last-mile delivery services across all 7 UAE Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Our owner-operated service ensures professional coverage throughout the entire UAE."
          }
        },
        {
          "@type": "Question",
          "name": "What are your delivery hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer night deliveries from 6 PM to 2 AM on weekdays, and full coverage on weekends (Saturday and Sunday). This ensures minimal traffic delays and higher success rates."
          }
        },
        {
          "@type": "Question",
          "name": "How much does delivery cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Night deliveries start from AED 40, and weekend deliveries from AED 50. We offer volume discounts and custom pricing for businesses with 50+ deliveries per month. No setup fees or long-term contracts required."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide proof of delivery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide photo documentation and customer signatures for every delivery. You get complete transparency with live location updates and proof of delivery for all orders."
          }
        },
        {
          "@type": "Question",
          "name": "What makes NightShift Logistics different?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are owner-operated, which means you communicate directly with the person handling your deliveries. No call centers, no middlemen, just instant decisions and professional care for every package."
          }
        }
      ]
    }
  ];

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    trackEvent('page_view', {
      page_title: 'E-Commerce Landing Page',
      page_location: window.location.href
    });

    const timer = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      setTimeOnPage(seconds);

      if (seconds === 10) trackEvent('time_on_page', { duration: '10_seconds' });
      else if (seconds === 30) trackEvent('time_on_page', { duration: '30_seconds' });
      else if (seconds === 60) trackEvent('time_on_page', { duration: '1_minute' });
      else if (seconds === 120) trackEvent('time_on_page', { duration: '2_minutes' });
      else if (seconds === 300) trackEvent('time_on_page', { duration: '5_minutes' });
    }, 1000);

    return () => {
      clearInterval(timer);
      const finalTime = Math.floor((Date.now() - startTime) / 1000);
      trackEvent('page_exit', {
        time_on_page: finalTime,
        reached_bottom: scrollDepthTracked['100']
      });
    };
  }, []);

  // Track scroll depth and section visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrolled(scrollTop > 50);

      // Track scroll depth milestones
      if (scrollPercent >= 25 && !scrollDepthTracked['25']) {
        setScrollDepthTracked(prev => ({ ...prev, '25': true }));
        trackEvent('scroll_depth', { depth: '25%' });
      }
      if (scrollPercent >= 50 && !scrollDepthTracked['50']) {
        setScrollDepthTracked(prev => ({ ...prev, '50': true }));
        trackEvent('scroll_depth', { depth: '50%' });
      }
      if (scrollPercent >= 75 && !scrollDepthTracked['75']) {
        setScrollDepthTracked(prev => ({ ...prev, '75': true }));
        trackEvent('scroll_depth', { depth: '75%' });
      }
      if (scrollPercent >= 95 && !scrollDepthTracked['100']) {
        setScrollDepthTracked(prev => ({ ...prev, '100': true }));
        trackEvent('scroll_depth', { depth: '100%' });
      }

      // Track section visibility
      const sections = ['benefits', 'how-it-works', 'pricing', 'contact'];
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
          if (isVisible && !sectionsViewed.has(sectionId)) {
            setSectionsViewed(prev => new Set([...prev, sectionId]));
            trackEvent('section_view', {
              section_name: sectionId,
              time_to_view: timeOnPage
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDepthTracked, sectionsViewed, timeOnPage]);

  const trackButtonClick = (buttonName: string, buttonLocation: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      button_location: buttonLocation,
      time_on_page: timeOnPage
    });
  };

  const trackLinkClick = (linkName: string, linkUrl: string) => {
    trackEvent('link_click', {
      link_name: linkName,
      link_url: linkUrl,
      time_on_page: timeOnPage
    });
  };

  const trackFormFieldFocus = (fieldName: string) => {
    trackEvent('form_field_focus', {
      field_name: fieldName,
      time_on_page: timeOnPage
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.phone && formData.pickup && formData.delivery) {
      setIsSubmitting(true);

      trackEvent('form_submit_attempt', {
        time_on_page: timeOnPage,
        package_size: formData.packageSize
      });

      try {
        const GOOGLE_FORM_ID = '1FAIpQLScUvVsq3KhDRudPQ4lWFPKA75Q6DCGiS2FsydtAuV4BXJ6grg';
        const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

        const googleFormData = new FormData();
        googleFormData.append('entry.1894689618', formData.name);
        googleFormData.append('entry.60601163', formData.email);
        googleFormData.append('entry.424067118', formData.phone);
        googleFormData.append('entry.1108186906', formData.pickup);
        googleFormData.append('entry.142342084', formData.delivery);
        googleFormData.append('entry.74867768', formData.packageSize);

        await fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          body: googleFormData,
          mode: 'no-cors'
        });

        setIsSubmitting(false);
        setIsSubmitted(true);

        trackEvent('form_submit_success', {
          time_on_page: timeOnPage,
          package_size: formData.packageSize,
          scroll_depth_reached: Math.max(
            ...Object.keys(scrollDepthTracked)
              .filter(key => scrollDepthTracked[key as keyof typeof scrollDepthTracked])
              .map(Number)
          )
        });

        trackEvent('generate_lead', {
          value: 1,
          currency: 'AED'
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', pickup: '', delivery: '', packageSize: 'small' });
        }, 10000);

      } catch (error) {
        setIsSubmitting(false);
        setIsSubmitted(true);

        trackEvent('form_submit_error', {
          error_message: error instanceof Error ? error.message : 'Unknown error',
          time_on_page: timeOnPage
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', pickup: '', delivery: '', packageSize: 'small' });
        }, 10000);
      }
    } else {
      trackEvent('form_submit_incomplete', {
        time_on_page: timeOnPage,
        fields_filled: Object.keys(formData).filter(key => formData[key as keyof FormData]).length
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData({ ...formData, [fieldName]: fieldValue });

    if (fieldValue && !formData[fieldName as keyof FormData]) {
      trackEvent('form_field_complete', {
        field_name: fieldName,
        time_on_page: timeOnPage
      });
    }
  };

  return (
    <>
      <SEO
        title="E-Commerce Last Mile Delivery UAE | Night & Weekend Service All Emirates | NightShift"
        description="Professional last-mile delivery for online stores across all UAE. Owner-operated night & weekend service with live tracking, proof of delivery. Dubai, Abu Dhabi, Sharjah & all Emirates. From AED 40."
        keywords="last mile delivery UAE, ecommerce delivery UAE Dubai Abu Dhabi Sharjah, night delivery ecommerce UAE, weekend delivery service UAE, package delivery all emirates, owner-operated courier UAE, online store delivery UAE, e-commerce fulfillment UAE, same day delivery UAE, express delivery UAE all emirates, parcel delivery UAE, courier service UAE"
        canonical="https://night-shiftlogistics.com/ecommerce"
        structuredData={structuredData}
        ogImage="https://night-shiftlogistics.com/images/og-ecommerce-delivery.jpg"
        twitterImage="https://night-shiftlogistics.com/images/twitter-ecommerce-delivery.jpg"
      />

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg transition-all ${
                  scrolled ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-white'
                }`}>
                  <Truck className={scrolled ? 'w-7 h-7 text-white' : 'w-7 h-7 text-cyan-600'} />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                    NightShift Logistics
                  </h1>
                  <p className={`text-sm font-medium ${scrolled ? 'text-cyan-600' : 'text-cyan-300'}`}>
                    E-Commerce Delivery Experts
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="#benefits"
                  onClick={() => trackLinkClick('Benefits', '#benefits')}
                  className={scrolled ? 'text-slate-700 hover:text-cyan-600 font-medium' : 'text-white hover:text-cyan-300 font-medium'}
                >
                  Benefits
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => trackLinkClick('How It Works', '#how-it-works')}
                  className={scrolled ? 'text-slate-700 hover:text-cyan-600 font-medium' : 'text-white hover:text-cyan-300 font-medium'}
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  onClick={() => trackLinkClick('Pricing', '#pricing')}
                  className={scrolled ? 'text-slate-700 hover:text-cyan-600 font-medium' : 'text-white hover:text-cyan-300 font-medium'}
                >
                  Pricing
                </a>
                <a
                  href="#contact"
                  onClick={() => trackButtonClick('Get Started', 'navigation')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header role="banner" className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-48 -left-24 animate-pulse" />
            <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-1/2 -right-24 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-400/30">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-300 font-semibold">Professional E-Commerce Delivery Partner</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight" itemProp="headline">
                  Your Customers Deserve <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Perfect Deliveries</span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Professional night & weekend last-mile delivery across <strong className="text-cyan-400">all UAE Emirates</strong> with our fleet of reliable cars. <strong className="text-cyan-400">Owner-operated</strong> means you speak directly with the person handling your deliveries – no middlemen, no delays, instant decisions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    onClick={() => trackButtonClick('Start Free Trial', 'hero_section')}
                    aria-label="Start free trial - Get your instant quote"
                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="https://wa.me/971565108183?text=Hello%20NightShift%2C%20I%27m%20interested%20in%20your%20e-commerce%20delivery%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick('WhatsApp Owner', 'hero_section')}
                    aria-label="Contact owner via WhatsApp"
                    className="bg-green-600/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 border border-green-500/30 hover:bg-green-600/30 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    <span>WhatsApp Owner</span>
                  </a>
                </div>
                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">No Setup Fees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Same-Day Onboarding</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Professional Care</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative bg-white/10 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-2xl animate-float">
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-pulse-glow">
                    Owner-Operated
                  </div>
                  <div className="space-y-6">
                    {[
                      { icon: Clock, stat: '< 2 Hour', label: 'Response Time', color: 'from-cyan-500 to-blue-500' },
                      { icon: Shield, stat: '100%', label: 'Package Care', color: 'from-blue-500 to-indigo-500' },
                      { icon: Users, stat: 'Direct', label: 'Owner Communication', color: 'from-indigo-500 to-purple-500' }
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all transform hover:scale-105"
                      >
                        <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-white">{stat.stat}</p>
                          <p className="text-slate-400">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Trust Bar */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-300">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Licensed & Regulated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Night & Weekend Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Customer Care Focus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main role="main">
          {/* Problem Section */}
          <section className="py-20 px-4 bg-slate-50" aria-labelledby="problem-section-heading">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  Your Delivery Partner Should Care As Much As <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">You Do</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Your brand reputation is on the line with every delivery. Generic courier services treat your packages like numbers. We treat them like what they are – your customer's experience.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    problem: 'Lost in the Queue',
                    solution: 'Direct Owner Access',
                    description: 'No call centers, no ticket systems. Text or call the owner directly for instant problem-solving.',
                    icon: Phone,
                    color: 'from-red-500 to-orange-500'
                  },
                  {
                    problem: 'Damaged Packages',
                    solution: 'White-Glove Handling',
                    description: 'Every package handled with care. Professional vehicle, secure storage, photo proof of condition.',
                    icon: Shield,
                    color: 'from-orange-500 to-yellow-500'
                  },
                  {
                    problem: 'Delayed Responses',
                    solution: 'Same-Hour Decisions',
                    description: 'Need a rush delivery? Route change? Special instructions? Get answers in minutes, not days.',
                    icon: Zap,
                    color: 'from-yellow-500 to-green-500'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    <div className={`bg-gradient-to-br ${item.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="mb-4">
                      <p className="text-red-600 font-semibold line-through text-sm mb-1">{item.problem}</p>
                      <h3 className="text-2xl font-bold text-slate-900">{item.solution}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="py-20 px-4 bg-white" aria-labelledby="benefits-heading">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 id="benefits-heading" className="text-4xl font-bold text-slate-900 mb-4">
                  Why E-Commerce Brands Choose Us
                </h2>
                <p className="text-xl text-slate-600">Professional service that makes your customers say "wow"</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Off-Peak Efficiency',
                    desc: 'Night & weekend deliveries mean zero traffic, faster routes, and predictable timing. Your customers get their orders when competitors can\'t deliver.',
                    icon: Clock
                  },
                  {
                    title: 'Owner-Operator Advantage',
                    desc: 'Direct line to the person driving your deliveries. No bureaucracy, no "let me check with my manager" – instant decisions, every time.',
                    icon: Users
                  },
                  {
                    title: 'Professional Fleet',
                    desc: 'Clean, well-maintained cars that represent your brand well. Perfect for packages and parcels with careful handling.',
                    icon: Truck
                  },
                  {
                    title: 'Proof of Delivery',
                    desc: 'Photo documentation and customer signatures for every delivery. Complete transparency and peace of mind for you and your customers.',
                    icon: Target
                  },
                  {
                    title: 'Flexible Scaling',
                    desc: 'From 10 deliveries a week to 100+ daily. We grow with your business without long-term contracts or minimum commitments.',
                    icon: TrendingUp
                  },
                  {
                    title: 'Care That Shows',
                    desc: 'Every package handled like it\'s the most important one. Because we know it\'s important to you and your customer.',
                    icon: Heart
                  }
                ].map((benefit, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-cyan-400 transition-all"
                  >
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-slate-900 to-blue-900" aria-labelledby="how-it-works-heading">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 id="how-it-works-heading" className="text-4xl font-bold text-white mb-4">
                  Get Started in 3 Simple Steps
                </h2>
                <p className="text-xl text-slate-300">From inquiry to first delivery in under 24 hours</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: 'Connect with Owner',
                    desc: 'Fill the form or call directly. Speak with the owner, not a sales rep. Get custom pricing based on your actual needs.',
                    time: '5 minutes'
                  },
                  {
                    step: '2',
                    title: 'Quick Onboarding',
                    desc: 'Share your delivery requirements, pickup locations, and preferences. We handle the logistics setup – no complicated integration needed.',
                    time: '30 minutes'
                  },
                  {
                    step: '3',
                    title: 'Start Delivering',
                    desc: 'Book your first delivery via WhatsApp, call, or our simple booking system. Get live updates and instant confirmation.',
                    time: 'Same day'
                  }
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/30 hover:bg-white/15 transition-all"
                  >
                    <div className="absolute -top-6 left-8 bg-gradient-to-r from-cyan-500 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {step.step}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-slate-300 mb-4 leading-relaxed">{step.desc}</p>
                      <div className="inline-flex items-center space-x-2 bg-cyan-500/20 px-4 py-2 rounded-full">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-300 text-sm font-semibold">{step.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="py-20 px-4 bg-slate-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
                <div className="flex justify-center items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600">5-Star Service Quality</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    quote: 'Finally, a delivery partner who actually cares. Our customers notice the difference in package condition and delivery speed.',
                    author: 'Sarah M.',
                    company: 'Fashion E-Commerce',
                    volume: '200+ deliveries/month'
                  },
                  {
                    quote: 'The owner-operator model is game-changing. I can text him directly and get instant solutions. No more waiting on hold.',
                    author: 'Ahmed K.',
                    company: 'Electronics Store',
                    volume: '150+ deliveries/month'
                  },
                  {
                    quote: 'Night deliveries solved our biggest problem – no more failed attempts during work hours. Our delivery success rate went from 70% to 98%.',
                    author: 'Priya S.',
                    company: 'Home Goods Brand',
                    volume: '300+ deliveries/month'
                  }
                ].map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-8 shadow-lg border-2 border-slate-200"
                  >
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-bold text-slate-900">{testimonial.author}</p>
                      <p className="text-sm text-slate-600">{testimonial.company}</p>
                      <p className="text-xs text-cyan-600 font-semibold mt-1">{testimonial.volume}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Preview */}
          <section id="pricing" className="py-20 px-4 bg-white" aria-labelledby="pricing-heading">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 id="pricing-heading" className="text-4xl font-bold text-slate-900 mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-xl text-slate-600">No hidden fees. No contracts. Pay per delivery.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Night Deliveries',
                    time: '6 PM - 2 AM',
                    price: 'From AED 40',
                    features: [
                      'Zero traffic delays',
                      'Higher success rate',
                      'Live location updates',
                      'Proof of delivery photos',
                      'Direct owner communication'
                    ],
                    popular: false
                  },
                  {
                    title: 'Weekend Deliveries',
                    time: 'Saturday & Sunday',
                    price: 'From AED 50',
                    features: [
                      'Premium weekend service',
                      'Flexible time slots',
                      'Live location updates',
                      'Proof of delivery photos',
                      'Priority support'
                    ],
                    popular: true
                  }
                ].map((plan, idx) => (
                  <div
                    key={idx}
                    className={`relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-2 ${
                      plan.popular ? 'border-cyan-500 shadow-2xl' : 'border-slate-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        Most Popular
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.title}</h3>
                      <p className="text-slate-600 mb-4">{plan.time}</p>
                      <div>
                        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                          {plan.price}
                        </span>
                        <span className="text-slate-600">/delivery</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-slate-600 text-center mb-4">
                      Volume discounts available • Custom pricing for 50+ deliveries/month
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-slate-600 mb-4">Need custom pricing for your volume?</p>
                <a
                  href="#contact"
                  onClick={() => trackLinkClick('Enterprise Pricing', 'pricing_section')}
                  className="inline-flex items-center space-x-2 text-cyan-600 font-semibold hover:text-cyan-700"
                >
                  <span>Contact us for enterprise pricing</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-900 to-blue-900" aria-labelledby="contact-heading">
            <div className="max-w-4xl mx-auto">
              {!isSubmitted ? (
                <div>
                  <div className="text-center mb-12">
                    <h2 id="contact-heading" className="text-4xl font-bold text-white mb-4">
                      Get Your Instant Quote
                    </h2>
                    <p className="text-xl text-slate-300">
                      Fill in the details and we'll get back to you within minutes
                    </p>
                  </div>
                  <form
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-cyan-400/30 shadow-2xl"
                    aria-label="Contact form for delivery quote"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name-field" className="block text-cyan-300 font-semibold mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name-field"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => trackFormFieldFocus('name')}
                          required
                          aria-required="true"
                          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone-field" className="block text-cyan-300 font-semibold mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone-field"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => trackFormFieldFocus('phone')}
                          required
                          aria-required="true"
                          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          placeholder="+971 XX XXX XXXX"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email-field" className="block text-cyan-300 font-semibold mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email-field"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => trackFormFieldFocus('email')}
                        required
                        aria-required="true"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="pickup-field" className="block text-cyan-300 font-semibold mb-2">
                        Pickup Location
                      </label>
                      <input
                        type="text"
                        id="pickup-field"
                        name="pickup"
                        value={formData.pickup}
                        onChange={handleChange}
                        onFocus={() => trackFormFieldFocus('pickup')}
                        required
                        aria-required="true"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter pickup address"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="delivery-field" className="block text-cyan-300 font-semibold mb-2">
                        Delivery Location
                      </label>
                      <input
                        type="text"
                        id="delivery-field"
                        name="delivery"
                        value={formData.delivery}
                        onChange={handleChange}
                        onFocus={() => trackFormFieldFocus('delivery')}
                        required
                        aria-required="true"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter delivery address"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="package-size-field" className="block text-cyan-300 font-semibold mb-2">
                        Package Size
                      </label>
                      <select
                        id="package-size-field"
                        name="packageSize"
                        value={formData.packageSize}
                        onChange={handleChange}
                        onFocus={() => trackFormFieldFocus('packageSize')}
                        aria-label="Select package size"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        <option value="small">Small (Up to 5 kg)</option>
                        <option value="mid">Medium (5-15 kg)</option>
                        <option value="large">Large (15-30 kg)</option>
                        <option value="xlarge">Extra Large (30+ kg)</option>
                        <option value="others">Other</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Submit quote request form"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <span>{isSubmitting ? 'Submitting...' : 'Request Quote Now'}</span>
                      {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </button>
                    <p className="text-slate-400 text-sm text-center mt-4">
                      🔒 Your information is secure. We'll contact you within 2 hours.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mb-6 animate-pulse">
                    <CheckCircle className="w-16 h-16 text-green-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Quote Request Received!</h3>
                  <p className="text-xl text-slate-300">
                    Our team will contact you within 5 minutes with your personalized quote.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 py-12 px-4 border-t border-slate-800" role="contentinfo">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-lg">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">NightShift</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Professional e-commerce last-mile delivery across all 7 UAE Emirates using reliable cars. Owner-operated for maximum reliability and care.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {['Benefits', 'How It Works', 'Pricing', 'Get Started'].map(link => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(' ', '-')}`}
                        onClick={() => trackLinkClick(link, 'footer')}
                        className="text-slate-400 hover:text-cyan-400 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <a
                      href="tel:+971565108183"
                      onClick={() => trackButtonClick('Call Phone', 'footer')}
                      className="text-slate-400 text-sm hover:text-cyan-400"
                    >
                      +971 56 510 8183
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <a
                      href="mailto:order@night-shiftlogistics.com"
                      onClick={() => trackButtonClick('Email', 'footer')}
                      className="text-slate-400 text-sm hover:text-cyan-400"
                    >
                      order@night-shiftlogistics.com
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Service Hours</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>🌙 Weekdays: 6 PM - 2 AM</li>
                  <li>📅 Weekends: Full Coverage</li>
                  <li>📞 Support: 24/7</li>
                  <li className="text-cyan-400 font-semibold mt-3">Serving All 7 UAE Emirates</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800 text-center">
              <p className="text-slate-500 text-sm">
                © 2025 NightShift Logistics. Professional Last-Mile E-Commerce Delivery Across All UAE Emirates.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
