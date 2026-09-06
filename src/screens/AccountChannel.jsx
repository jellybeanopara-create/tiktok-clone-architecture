import { useNavigate } from 'react-router-dom'

export default function AccountChannel() {
  const navigate = useNavigate()

  return (
    <div className="screen safe-top" style={{ background: '#000', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 16px 20px', position: 'relative' }}>
        <button onClick={() => navigate(-1)} style={{ fontSize: 22, color: '#fff', position: 'absolute', left: 16 }}>{'\u2039'}</button>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Account & Channel</h1>
      </div>

      {/* Personal Account card */}
      <div style={{ margin: '0 16px 16px', background: '#1E1E1E', borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{'\uD83E\uDDDD\u200D\u2642\uFE0F'}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>@veltorix</div>
          <div style={{ fontSize: 13, color: '#A0A0A0', marginTop: 2 }}>Personal Account</div>
        </div>
        <button style={{ padding: '6px 18px', borderRadius: 20, border: '1px solid #555', color: '#fff', fontSize: 13, background: 'none' }}>Edit</button>
      </div>

      {/* Channel card */}
      <div style={{ margin: '0 16px 16px', background: '#1E1E1E', borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 50, height: 50, borderRadius: 12, background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{'\u26F0\uFE0F'}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Veltorix Adventures</div>
          <div style={{ fontSize: 13, color: '#A0A0A0', marginTop: 2 }}>Channel / Page</div>
          <div style={{ fontSize: 12, color: '#707070', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>{'\uD83D\uDC65'}</span> 12.4K followers
          </div>
        </div>
        <button style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid #555', color: '#fff', fontSize: 13, background: 'none', whiteSpace: 'nowrap' }}>Manage Channel</button>
      </div>

      {/* New section */}
      <div style={{ fontSize: 12, fontWeight: 600, color: '#707070', padding: '8px 16px', letterSpacing: 0.5 }}>NEW</div>
      <div style={{ margin: '0 16px', background: '#1E1E1E', borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>+</div>
        <span style={{ fontSize: 15, fontWeight: 500 }}>Create new Channel</span>
      </div>
    </div>
  )
}
