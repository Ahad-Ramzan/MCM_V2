import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata = {
  title: 'MCM Materiais Construção',
  description: 'Generated by Next.js',
  icons: {
    icon: [
      { url: '/img/ICONE.jpg' },
      { url: '/img/ICONE.jpg', sizes: '32x32', type: 'image/png' },
      { url: '/img/ICONE.jpg', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/img/ICONE.jpg' },
      { url: '/img/ICONE.jpg', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/logo.png" />
        <link rel="apple-touch-icon" href="/img/logo.png" />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
