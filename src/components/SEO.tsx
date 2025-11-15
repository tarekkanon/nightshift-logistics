import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'NightShift Logistics - Dubai\'s Night & Weekend Delivery Experts',
  description = 'Dubai\'s premier after-hours cargo delivery service. Specialized night and weekend logistics solutions across all 7 Emirates. Fast, reliable, 24/7 delivery service.',
  keywords = 'Dubai delivery, night delivery, weekend delivery, cargo van, logistics UAE, after hours delivery, 24/7 delivery Dubai, UAE logistics, cargo service Dubai, express delivery UAE, same day delivery Dubai, weekend cargo service',
  canonical = 'https://night-shiftlogistics.com',
  ogImage = 'https://night-shiftlogistics.com/og-image.jpg',
  ogType = 'website',
  structuredData
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NightShift Logistics",
    "description": description,
    "url": "https://night-shiftlogistics.com",
    "logo": "https://night-shiftlogistics.com/logo.png",
    "image": ogImage,
    "telephone": "+971-XX-XXX-XXXX",
    "email": "info@night-shiftlogistics.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AE",
      "addressRegion": "Dubai",
      "addressLocality": "Dubai"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.2048",
      "longitude": "55.2708"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Dubai"
      },
      {
        "@type": "City",
        "name": "Abu Dhabi"
      },
      {
        "@type": "City",
        "name": "Sharjah"
      },
      {
        "@type": "City",
        "name": "Ajman"
      },
      {
        "@type": "City",
        "name": "Ras Al Khaimah"
      },
      {
        "@type": "City",
        "name": "Fujairah"
      },
      {
        "@type": "City",
        "name": "Umm Al Quwain"
      }
    ],
    "serviceType": "Logistics and Delivery Service",
    "priceRange": "$$",
    "openingHours": "Mo-Su 00:00-23:59",
    "sameAs": [
      "https://www.facebook.com/nightshiftlogistics",
      "https://www.instagram.com/nightshiftlogistics",
      "https://twitter.com/nightshiftdubai"
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="NightShift Logistics" />
      <meta property="og:locale" content="en_AE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@nightshiftdubai" />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="NightShift Logistics" />
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />

      {/* Mobile Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="NightShift" />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
