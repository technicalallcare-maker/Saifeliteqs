import './globals.css';

export const metadata = {
  title: 'Saif Elite QS | Quantity Surveyor & Cost Consultant — Dubai, UAE',
  description: 'Professional Quantity Surveying and Cost Consultancy services across UAE and GCC. Expert cost planning, contract administration, and project management.',
  keywords: 'quantity surveyor dubai, cost consultant UAE, QS services, cost planning, bill of quantities, contract administration',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
