import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Toolva — Herramientas Online Gratuitas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
          <div style={{
            width: 80, height: 80,
            background: 'white',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 48, fontWeight: 900, color: '#4F46E5' }}>T</span>
          </div>
          <span style={{ fontSize: 72, fontWeight: 900, color: 'white' }}>Toolva</span>
        </div>
        <p style={{ fontSize: 32, color: 'rgba(255,255,255,0.85)', margin: 0, textAlign: 'center', maxWidth: 800 }}>
          Más de 40 herramientas online gratuitas
        </p>
        <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>
          Calculadoras · Conversores · Utilidades · Sin registro
        </p>
      </div>
    ),
    { ...size }
  );
}
