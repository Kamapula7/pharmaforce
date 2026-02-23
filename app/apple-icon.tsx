import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#111111',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="110" height="110" viewBox="0 0 32 32" fill="none">
          <path d="M19 4L10 18H16L13 28L23 13H17L19 4Z" fill="#F97316" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
