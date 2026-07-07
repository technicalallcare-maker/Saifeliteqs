import './globals.css';
import ChatBot from '../components/ChatBot';

export const metadata = {
  title: 'Saif Elite QS | Quantity Surveyor & Cost Consultant — Dubai, UAE',
  description: 'Professional Quantity Surveying and Cost Consultancy services across UAE and GCC.',
  icons: {
    icon: '/images/QS_logo_bg.png',
    apple: '/images/QS_logo_bg.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
