import './globals.css';
import ChatBot from '../components/ChatBot';
import Tracker from '../components/Tracker';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://www.saifeliteqs.com'),
  title: {
    default: 'Saif Elite QS | Quantity Surveyor & Cost Consultant — Dubai, UAE',
    template: '%s | Saif Elite QS'
  },
  description: 'Leading Quantity Surveying and Cost Consultancy firm in Dubai, UAE. RICS & AIQS aligned. Serving UAE, GCC, UK, Ireland, New Zealand & Australia. 200+ projects, AED 2B+ managed.',
  keywords: [
    'Quantity Surveyor Dubai',
    'Cost Consultant UAE',
    'RICS Dubai',
    'AIQS Dubai',
    'Bill of Quantities UAE',
    'Cost Planning Dubai',
    'Construction Cost Management',
    'Contract Administration UAE',
    'Feasibility Studies Dubai',
    'Value Engineering GCC',
    'Procurement Strategy UAE',
    'Dispute Resolution Construction',
    'QS Services Dubai',
    'Building Material Source Provider',
    'Quantity Surveying UK',
    'QS Ireland',
    'QS New Zealand',
    'QS Australia',
  ],
  authors: [{ name: 'Saif Elite QS' }],
  creator: 'Saif Elite QS',
  publisher: 'Saif Elite QS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.saifeliteqs.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.saifeliteqs.com',
    siteName: 'Saif Elite QS',
    title: 'Saif Elite QS | Quantity Surveyor & Cost Consultant — Dubai, UAE',
    description: 'Leading Quantity Surveying and Cost Consultancy firm in Dubai, UAE. RICS & AIQS aligned. Serving UAE, GCC, UK, Ireland, New Zealand & Australia.',
    images: [
      {
        url: '/images/QS_logo_bg.png',
        width: 1200,
        height: 630,
        alt: 'Saif Elite QS - Quantity Surveyor & Cost Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saif Elite QS | Quantity Surveyor & Cost Consultant',
    description: 'Leading QS & Cost Consultancy firm in Dubai. RICS & AIQS aligned. 200+ projects, AED 2B+ managed.',
    images: ['/images/QS_logo_bg.png'],
    creator: '@saifeliteqs',
  },
  icons: {
    icon: '/images/QS_logo_bg.png',
    apple: '/images/QS_logo_bg.png',
    shortcut: '/images/QS_logo_bg.png',
  },
  verification: {
    google: 'REPLACE_WITH_GOOGLE_VERIFICATION_CODE',
  },
  category: 'Professional Services',
};

// Schema.org — Organization & Local Business
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.saifeliteqs.com/#organization',
      name: 'Saif Elite QS',
      alternateName: 'Saif Elite Quantity Surveying',
      description: 'Professional Quantity Surveying and Cost Consultancy firm serving UAE, GCC and internationally.',
      url: 'https://www.saifeliteqs.com',
      logo: 'https://www.saifeliteqs.com/images/QS_logo_bg.png',
      image: 'https://www.saifeliteqs.com/images/QS_logo_bg.png',
      foundingDate: '2014',
      email: 'info@saifeliteqs.com',
      telephone: '+971505053679',
      priceRange: '$$-$$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
        addressRegion: 'Dubai',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.2048,
        longitude: 55.2708,
      },
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Ireland' },
        { '@type': 'Country', name: 'New Zealand' },
        { '@type': 'Country', name: 'Australia' },
      ],
      sameAs: [
        'https://www.instagram.com/saifeliteqs/',
        'https://www.linkedin.com/company/saif-elite-qs',
        'https://www.facebook.com/people/Saif-Elite-QS/61590199756177/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+971505053679',
        email: 'info@saifeliteqs.com',
        contactType: 'Customer Service',
        areaServed: ['AE', 'GB', 'IE', 'NZ', 'AU'],
        availableLanguage: ['English', 'Arabic'],
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Quantity Surveying Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cost Planning & Estimation',
              description: 'Detailed estimates and cost plans at every design stage.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bill of Quantities',
              description: 'Precisely measured Bills of Quantities to international standards.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Contract Administration',
              description: 'Expert management of construction contracts and variations.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Project Cost Management',
              description: 'Proactive monitoring, forecasting and reporting throughout construction.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Dispute Resolution',
              description: 'Professional quantum preparation for disputes and adjudications.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Feasibility Studies',
              description: 'Financial viability assessments and investment appraisals.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Procurement Strategy',
              description: 'Guidance on procurement routes and tendering strategies.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Value Engineering',
              description: 'Structured cost reduction without compromising quality.',
            },
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '87',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.saifeliteqs.com/#website',
      url: 'https://www.saifeliteqs.com',
      name: 'Saif Elite QS',
      description: 'Quantity Surveyor & Cost Consultant — Dubai, UAE',
      publisher: { '@id': 'https://www.saifeliteqs.com/#organization' },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.saifeliteqs.com/?s={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1506882897281487');
              fbq('track', 'PageView');
            `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1506882897281487&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
      </head>

      <body>
        {children}
        <Tracker />
        <ChatBot />
      </body>
    </html>
  );
}
