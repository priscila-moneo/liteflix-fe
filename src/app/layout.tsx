'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./styles/styles.scss";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Metaetiquetas básicas */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Liteflix - The best place to watch movies and TV shows online" />
        <meta name="keywords" content="movies, tv shows, watch online, streaming" />
        <meta name="author" content="Liteflix" />

        {/* Open Graph (OG) Meta Tags */}
        <meta property="og:title" content="Liteflix - Watch Movies and TV Shows" />
        <meta property="og:description" content="Liteflix offers a great collection of movies and TV shows for your entertainment." />
        <meta property="og:url" content="https://www.liteflix.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Liteflix - Watch Movies and TV Shows" />

        {/* Favicon */}
        <link rel="icon" href="/assets/favicon.ico" />

        {/* Título de la página */}
        <title>Liteflix - Watch Movies and TV Shows</title>
      </head>
      <body className="min-h-screen">
        {/* Proveedor de React Query */}
        <QueryClientProvider client={queryClient}>
          {children}
          <SpeedInsights/>
        </QueryClientProvider>
      </body>
    </html>
  );
}
