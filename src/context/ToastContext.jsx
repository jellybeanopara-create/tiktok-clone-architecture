import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null)

  const show = useCallback((msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 2500)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {message && (
        <div style={{
          position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          background: '#1E1E1E', color: '#fff', padding: '12px 24px',
          borderRadius: 12, fontSize: 14, zIndex: 9999,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)', whiteSpace: 'nowrap',
          maxWidth: '90%', textAlign: 'center',
        }}>{message}</div>
      )}
    </ToastContext.Provider>
  )
}
