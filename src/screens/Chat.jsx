import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { messageThreads, chatMessages } from '../data/mockData'

export default function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const thread = messageThreads.find(t => t.id === parseInt(id)) || messageThreads[0]
  const initialMsgs = chatMessages[thread.id] || []
  const [messages, setMessages] = useState(initialMsgs)
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: Date.now(), sender: 'me', type: 'text', text: input }])
    setInput('')
  }

  return (
    <div className="screen" style={{ background: '#000', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="safe-top" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid #1a1a1a' }}>
        <button onClick={() => navigate('/messages')} style={{ fontSize: 22, color: '#fff' }}>{'\u2039'}</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
          {thread.name.startsWith('@') ? '\uD83C\uDF0D' : '\uD83D\uDC65'}
        </div>
        <span style={{ fontWeight: 600, fontSize: 16, flex: 1 }}>{thread.name}</span>
        <button style={{ fontSize: 22 }}>{'\uD83D\uDCF9'}</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
            maxWidth: '75%',
          }}>
            <div style={{
              padding: '10px 14px', borderRadius: 16,
              background: msg.sender === 'me' ? '#007AFF' : '#1E1E1E',
              fontSize: 14, lineHeight: 1.4,
            }}>
              {msg.type === 'link' ? (
                <span style={{ color: '#8ab4ff', textDecoration: 'underline' }}>{msg.text}</span>
              ) : msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderTop: '1px solid #1a1a1a' }}>
        <button style={{ fontSize: 22, padding: 4 }}>{'\uD83D\uDDBC'}</button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Send a message..."
          style={{
            flex: 1, padding: '10px 16px', borderRadius: 25,
            background: '#1E1E1E', border: 'none', color: '#fff', fontSize: 14, outline: 'none',
          }}
        />
        <button onClick={send} style={{ fontSize: 18, padding: '4px 8px' }}>{'\u2191'}</button>
      </div>
    </div>
  )
}
