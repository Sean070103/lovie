import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#4a90e2" />
        <meta name="description" content="Lovie - A responsive web application" />
      </head>
      <body>{children}</body>
    </html>
  );
}
