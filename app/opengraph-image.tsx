import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Lucci Labs — Web3 / Crypto / DeFi R&D';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, #0a0a0a, #171717)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 20,
          }}
        >
          Lucci Labs
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#a3a3a3',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          A playground for Web3 / Crypto / DeFi R&D
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

