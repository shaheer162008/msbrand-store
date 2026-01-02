'use client'

import React from 'react'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: 'white', paddingTop: '128px', paddingBottom: '64px', paddingLeft: '32px', paddingRight: '32px', marginTop: '128px', borderTop: '8px solid #FFD600' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px', marginBottom: '128px' }}>
          <div style={{ gridColumn: 'span 5' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '32px', fontStyle: 'italic' }}>
              MS BRAND <span style={{ color: '#FFD600' }}>STORE.</span>
            </div>
            <p style={{ color: '#71717a', fontWeight: 'bold', lineHeight: '1.8', maxWidth: '400px' }}>
              The world's most versatile marketplace. We deliver whatever you need, wherever you are.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#27272a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFD600'; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#27272a'; e.currentTarget.style.color = 'white'; }}>
                <i className="fa-brands fa-facebook-f" style={{ fontSize: '20px' }}></i>
              </div>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#27272a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFD600'; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#27272a'; e.currentTarget.style.color = 'white'; }}>
                <i className="fa-brands fa-instagram" style={{ fontSize: '20px' }}></i>
              </div>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#27272a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFD600'; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#27272a'; e.currentTarget.style.color = 'white'; }}>
                <i className="fa-brands fa-whatsapp" style={{ fontSize: '20px' }}></i>
              </div>
            </div>
          </div>
          <div style={{ gridColumn: 'span 7', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h5 style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#52525b' }}>Shopping</h5>
              <a href="#" style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD600'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Daily Food</a>
              <a href="#" style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD600'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Electronics</a>
              <a href="#" style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD600'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Pharmacy</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h5 style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#52525b' }}>Company</h5>
              <a href="#" style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD600'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Become a Partner</a>
              <a href="#" style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD600'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Careers</a>
              <a href="#" style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD600'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Safety Hub</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h5 style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#52525b' }}>Download</h5>
              <div style={{ backgroundColor: '#27272a', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#27272a'; e.currentTarget.style.color = 'white'; }}>
                <i className="fa-brands fa-apple" style={{ fontSize: '24px' }}></i>
                <div>
                  <p style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', opacity: 0.6 }}>App Store</p>
                  <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>iOS Mobile</p>
                </div>
              </div>
              <div style={{ backgroundColor: '#27272a', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#27272a'; e.currentTarget.style.color = 'white'; }}>
                <i className="fa-brands fa-google-play" style={{ fontSize: '20px' }}></i>
                <div>
                  <p style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', opacity: 0.6 }}>Play Store</p>
                  <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>Android App</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: '48px', borderTop: '1px solid #27272a', gap: '32px' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#52525b' }}>
            © 2025 MS BRAND STORE. ALL SYSTEM PROTOCOLS SECURE.
          </span>
          <div style={{ display: 'flex', gap: '48px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#52525b' }}>
            <a href="#" style={{ color: '#52525b', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD600'} onMouseLeave={(e) => e.currentTarget.style.color = '#52525b'}>Privacy</a>
            <a href="#" style={{ color: '#52525b', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD600'} onMouseLeave={(e) => e.currentTarget.style.color = '#52525b'}>Terms</a>
            <a href="#" style={{ color: '#52525b', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD600'} onMouseLeave={(e) => e.currentTarget.style.color = '#52525b'}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer