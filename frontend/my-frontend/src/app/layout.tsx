import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import '../index.css'

export const metadata = {
  title: 'ETS Turlar',
  description: 'ETS Turlar uygulaması',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#0b0b0b] text-white">
        {/* Fixed left sidebar (space reserved with padding-left on main) */}
        <Sidebar />

        {/* Header - fixed at top, content shifted right by sidebar (pl-64) */}
        <header className="fixed top-0 left-0 right-0 h-16 pl-64 flex items-center gap-4 px-6 bg-white/5 backdrop-blur-sm z-40">
          <div className="flex-1">
            <form className="max-w-xl">
              <label htmlFor="search" className="sr-only">Ara</label>
              <input
                id="search"
                name="search"
                placeholder="Tur, şehir, mekan ara..."
                className="w-full rounded-md border-0 bg-white/6 px-3 py-2 text-sm placeholder:text-white/60 focus:outline-none"
              />
            </form>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded bg-white/6 text-sm">Giriş</button>
            <button className="px-3 py-2 rounded bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm">Kayıt Ol</button>
          </div>
        </header>

        {/* Main content: shifted right to leave room for the fixed sidebar (pl-64) and below header (pt-16) */}
        <main className="pl-64 pt-16">{children}</main>
      </body>
    </html>
  )
}
