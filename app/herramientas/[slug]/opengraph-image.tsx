import { ImageResponse } from 'next/og';
import { getToolBySlug } from '@/lib/tools/registry';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  const name = tool?.name ?? 'Herramienta';
  const desc = tool?.description ?? 'Herramienta online gratuita';
  const icon = tool?.icon ?? '🔧';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48, opacity: 0.7 }}>
          <div style={{ width: 36, height: 36, background: '#4F46E5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: 20 }}>T</span>
          </div>
          <span style={{ color: 'white', fontSize: 24, fontWeight: 700 }}>Toolva</span>
        </div>
        <div style={{ fontSize: 96, marginBottom: 24 }}>{icon}</div>
        <h1 style={{ fontSize: 64, fontWeight: 900, color: 'white', margin: 0, textAlign: 'center', lineHeight: 1.1 }}>
          {name}
        </h1>
        <p style={{ fontSize: 28, color: 'rgba(255,255,255,0.7)', marginTop: 20, textAlign: 'center', maxWidth: 800 }}>
          {desc}
        </p>
        <div style={{
          marginTop: 40,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 999,
          padding: '10px 28px',
          fontSize: 20,
          color: 'rgba(255,255,255,0.8)',
        }}>
          Gratis · Sin registro · toolva.com
        </div>
      </div>
    ),
    { ...size }
  );
}
