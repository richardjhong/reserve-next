import NavBar from './components/NavBar'
import './globals.css'

export const metadata = {
  title: 'OpenTable',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-200 min-h-screen w-screen">
         <main className="max-w-screen-2xl m-auto bg-white">
          <NavBar />
          {children}
          </main>
        </main>
      </body>
    </html>
  )
}
