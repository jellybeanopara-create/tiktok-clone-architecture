export default function Logo({ size = 48, showText = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 40 40" fill="none">
          {/* Stylized M with world map negative space */}
          <path d="M6 32V8l7 14 7-14 7 14 7-14v24" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="3" fill="none" stroke="#000" strokeWidth="1.5" opacity="0.3" />
        </svg>
      </div>
      {showText && (
        <span style={{ fontWeight: 800, fontSize: size * 0.4, color: '#fff', letterSpacing: -0.5 }}>
          veltorix
        </span>
      )}
    </div>
  )
}
