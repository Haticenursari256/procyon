import React from 'react'

export default function Sidebar({ className = '', onClose }) {
  return (
    <aside className={`w-64 bg-white/6 p-4 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Menü</h3>
        {onClose && (
          <button aria-label="Kapat" onClick={onClose} className="md:hidden">
            ✕
          </button>
        )}
      </div>

      <nav className="space-y-2">
        <a href="#" className="block px-3 py-2 rounded hover:bg-white/5">Turlar</a>
        <a href="#" className="block px-3 py-2 rounded hover:bg-white/5">Ulaşım</a>
        <a href="#" className="block px-3 py-2 rounded hover:bg-white/5">Rozetler</a>
        <a href="#" className="block px-3 py-2 rounded hover:bg-white/5">Profil</a>
      </nav>
    </aside>
  )
}
