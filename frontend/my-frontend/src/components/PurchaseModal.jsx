import React from 'react'

export default function PurchaseModal({ open, onClose, item }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative max-w-md w-full bg-white/6 rounded-lg p-6">
        <h3 className="text-lg font-semibold">Satın Alma Onayı</h3>
        <p className="mt-2 text-sm text-gray-300">{item?.title} için ödemeyi onaylıyor musunuz?</p>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-700 text-white">İptal</button>
          <button onClick={() => { alert('Ödeme başarıyla gerçekleştirildi.'); onClose() }} className="px-4 py-2 rounded bg-gradient-to-r from-red-500 to-red-600 text-white">Öde {item?.price}</button>
        </div>
      </div>
    </div>
  )
}
