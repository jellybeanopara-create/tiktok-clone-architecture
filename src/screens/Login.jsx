import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import Logo from '../components/Logo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setAuthed } = useAuth()
  const navigate = useNavigate()
  const { show } = useToast()

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setAuthed(true)
    navigate('/home')
  }

  const socialLogin = () => {
    setAuthed(true)
    navigate('/home')
  }

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 30px', gap: 16 }}>
      <div style={{ marginBottom: 20 }}>
        <Logo size={72} />
      </div>

      {error && (
        <div style={{ color: '#FF3B30', fontSize: 13, textAlign: 'center' }}>{error}</div>
      )}

      <input
        type="text"
        placeholder="Email or phone"
        value={email}
        onChange={e => { setEmail(e.target.value); setError('') }}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => { setPassword(e.target.value); setError('') }}
        style={inputStyle}
      />

      <button onClick={handleLogin} style={loginBtnStyle}>Log in</button>

      <button onClick={() => show('Password reset link sent to your email')} style={{ color: '#fff', fontSize: 14, background: 'none', padding: '4px' }}>Forgot password?</button>

      <button onClick={() => show('Sign up coming soon!')} style={outlineBtnStyle}>Create new account</button>
      <button onClick={socialLogin} style={outlineBtnStyle}>Sign up with Apple ID</button>
      <button onClick={socialLogin} style={outlineBtnStyle}>Continue with Google</button>

      <div style={{ flex: 1 }} />
      <Logo size={20} showText />
    </div>
  )
}

const inputStyle = {
  width: '100%',
  maxWidth: 340,
  padding: '14px 18px',
  borderRadius: 12,
  background: '#1A1A1A',
  border: '1px solid #333',
  color: '#fff',
  fontSize: 15,
  outline: 'none',
}
const loginBtnStyle = {
  width: '100%',
  maxWidth: 340,
  padding: '14px',
  borderRadius: 12,
  background: '#fff',
  color: '#000',
  fontSize: 16,
  fontWeight: 700,
}
const outlineBtnStyle = {
  width: '100%',
  maxWidth: 340,
  padding: '13px',
  borderRadius: 12,
  background: 'transparent',
  border: '1px solid #fff',
  color: '#fff',
  fontSize: 15,
}
