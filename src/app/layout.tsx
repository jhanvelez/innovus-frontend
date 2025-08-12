import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import { Toaster } from 'react-hot-toast'

import ReduxProvider from '@/providers/ReduxProvider'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Water mider',
    default: 'Water mider - Innovus',
  },
  description:
    'Monitorea y gestiona el consumo de agua en tiempo real con precisión y eficiencia.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <html
        lang="en"
        className={clsx(
          'h-full scroll-smooth bg-white antialiased',
          inter.variable,
          lexend.variable,
        )}
      >
        <body className="flex h-full flex-col">
          <Toaster position="top-right" />
          {children}
        </body>
      </html>
    </ReduxProvider>
  )
}
