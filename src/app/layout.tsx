'use client'

import { BlitzProvider } from 'src/blitz-client'
import '../styles/globals.css'

// TODO: use react-helmet
// export const metadata: Metadata = {
//   title: 'Home',
//   description: 'Welcome to Next.js',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full">
      <body className="flex min-h-full w-full text-gray-800 antialiased">
        <BlitzProvider>
          <div className="relative flex-auto">{children}</div>
        </BlitzProvider>
      </body>
    </html>
  )
}
