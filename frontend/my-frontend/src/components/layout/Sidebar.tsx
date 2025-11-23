"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'ETS Turlar', href: '/ets-turlar' },
  { label: 'Ulaşım', href: '/ulasim' },
  { label: 'Mekanlar', href: '/mekanlar' },
  { label: 'Rozetler', href: '/rozetler' },
  { label: 'Profil', href: '/profil' },
]

export default function Sidebar(): React.ReactElement {
  const pathname = usePathname() || '/'

  return (
    <aside className="fixed left-0 top-0 h-full w-[250px] bg-gradient-to-b from-indigo-600 via-purple-600 to-blue-600 text-white p-6 flex flex-col">
      {/* Profile */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">👤</div>
        <div>
          <div className="text-sm font-semibold">Misafir Kullanıcı</div>
          <div className="text-xs text-white/80">Hoş geldiniz</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 transition-colors text-sm font-medium ${
                isActive ? 'bg-purple-700/80' : 'hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
        <div className="pt-6 text-xs text-white/80 mb-4">© {new Date().getFullYear()} ETS</div>

        <Link
          href="/logout"
          className="block w-full text-center rounded-md px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:opacity-95"
        >
          Çıkış Yap
        </Link>
      </div>
    </aside>
  )
}
