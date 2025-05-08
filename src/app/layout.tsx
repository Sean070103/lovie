import '../styles/globals.css';
import StarsGalaxyBackground from './StarsGalaxyBackground';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FF6B6B" />
        <meta name="description" content="Lovie - A beautiful and modern web application" />
        <meta property="og:title" content="Lovie" />
        <meta property="og:description" content="A beautiful and modern web application" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <StarsGalaxyBackground />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
