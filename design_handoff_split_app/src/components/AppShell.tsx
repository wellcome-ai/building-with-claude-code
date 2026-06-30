import React from 'react';
import { color, radius } from '../tokens';

/**
 * Mobile container. The dark rounded "phone" bezel is PROTOTYPE CHROME only —
 * in a real app, the screen fills the viewport (max-width ~440px, centered).
 * Drop the bezel and render `children` straight into your app root.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#E9EBEF', padding: 24 }}>
      <div
        style={{
          width: 392,
          height: 812,
          background: color.surface,
          borderRadius: radius.phone,
          border: `1px solid ${color.border}`,
          boxShadow: '0 1px 3px rgba(20,21,43,.08), 0 40px 80px rgba(20,21,43,.18)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* iOS-style status bar (prototype chrome). */}
        <div style={{ height: 46, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', background: color.background, flex: 'none' }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>9:41</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 11 }}>
              {[5, 7, 9, 11].map((h) => (
                <div key={h} style={{ width: 3, height: h, background: color.fg, borderRadius: 1 }} />
              ))}
            </div>
            <div style={{ width: 22, height: 11, border: `1.5px solid ${color.fg}`, borderRadius: 3, display: 'flex', alignItems: 'center', padding: 1.5 }}>
              <div style={{ width: 13, height: '100%', background: color.fg, borderRadius: 1 }} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', background: color.background, position: 'relative' }}>{children}</div>
      </div>
    </div>
  );
}
