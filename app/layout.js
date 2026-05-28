import './globals.css'

export const metadata = {
  title: 'Signal Hunter — Grantbot',
  description: 'Find your next 100 outreach targets using creative signal discovery. Describe your ICP and get a custom signal map in minutes.',
  openGraph: {
    title: 'Signal Hunter by Grantbot',
    description: 'Find your next 100 outreach targets before they raise their hand.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
