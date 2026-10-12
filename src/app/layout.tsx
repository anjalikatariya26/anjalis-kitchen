import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: "Anjali's Kitchen — Ghar Ka Swaad",
  description:
    'Homemade Maharashtrian sweets, snacks, festival faral and Jain-friendly fresh food. Made fresh to order in Ahilyanagar.',
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Anjali's Kitchen — Ghar Ka Swaad",
    description:
      'Homemade Maharashtrian sweets, snacks, festival faral and Jain-friendly fresh food.',
    siteName: "Anjali's Kitchen",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
