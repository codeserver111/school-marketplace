import { Inter } from 'next/font/google'
import dynamic from "next/dynamic";
import "../src/index.css";

// Create a client component that wraps all providers
const Providers = dynamic(() => import("../src/components/Providers"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SchoolFinder - Find the Best Schools Near You',
  description: 'Discover and compare the best schools near you. Find ratings, fees, amenities and request callbacks from top schools.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'SchoolFinder - Find the Best Schools Near You',
    description: 'Discover and compare the best schools near you. Find ratings, fees, amenities and request callbacks.',
    type: 'website',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SchoolFinder',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#E23744',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
