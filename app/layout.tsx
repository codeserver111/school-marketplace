import { Inter } from 'next/font/google'
import dynamic from "next/dynamic";
import "../src/index.css";
import "leaflet/dist/leaflet.css";

import { Spinner } from "@/components/ui/spinner";

// Create a client component that wraps all providers
const Providers = dynamic(() => import("../src/components/Providers"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size={32} />
    </div>
  )
});

const inter = Inter({ subsets: ['latin'] })

import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata();

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
