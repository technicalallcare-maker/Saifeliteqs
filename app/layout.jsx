import './globals.css';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
});

export const metadata = {
  title: 'Saif Elite QS | Quantity Surveyor & Cost Consultant',
  description:
    'Professional Quantity Surveying and Cost Consultancy services in UAE. Expert cost planning, contract administration, and project management.',
  keywords:
    'quantity surveyor, cost consultant, QS, construction, cost planning, Dubai, UAE',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
