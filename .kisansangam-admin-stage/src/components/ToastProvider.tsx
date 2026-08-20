/* eslint-disable react-refresh/only-export-components */
import { CheckCircle2, X } from 'lucide-react'
import { createContext, type PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'

interface ToastItem {
  id: number
  message: string
}

interface ToastContextValue {
  notify: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ToastItem[]>([])

  const notify = useCallback((message: string) => {
    const id = Date.now()
    setItems((current) => [...current, { id, message }])
    window.setTimeout(() => setItems((current) => current.filter((item) => item.id !== id)), 3200)
  }, [])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="fixed bottom-6 right-6 z-[80] flex w-80 flex-col gap-2">
        {items.map((item) => (
          <div key={item.id} className="toast-in flex items-center gap-3 rounded-xl bg-brand-900 px-4 py-3 text-sm font-medium text-white shadow-dialog">
            <CheckCircle2 size={18} aria-hidden="true" />
            <span className="flex-1">{item.message}</span>
            <button
              aria-label="Dismiss notification"
              className="rounded p-1 hover:bg-white/10"
              onClick={() => setItems((current) => current.filter((candidate) => candidate.id !== item.id))}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
