import type { Metadata } from 'next'

// We removed the globals.css line to fix the "Module not found" error

export const metadata: Metadata = {
  title: 'THE VIBE GAMES | 2026 New Year Vault',
  description: 'Someone stashed a message for you. Tap to unfold your 2026 Vibe.',
  openGraph: {
    title: 'You have a message in the Vault 🔐',
    description: 'A meditative New Year greeting is waiting for you. Tap to unfold.',
    url: 'https://vibe-letter-final-clean.vercel.app',
    siteName: 'THE VIBE GAMES | 2026 New Year Vault',
    images: [
      {
        url: 'https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png', 
        width: 1200,
        height: 630,
        alt: 'The Vibe Gold Vault',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Vibe is waiting for you',
    description: 'Tap to unfold your meditative New Year stash.',
    images: ['https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
        {/* This line is critical; it displays your sender, success, and receiver pages */}
        {children}
      </body>
    </html>
  )
}
