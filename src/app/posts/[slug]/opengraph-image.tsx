import { ImageResponse } from 'next/og';
import { getPost } from '../../../../lib/hashnode';

export const alt = 'pyndu logs() Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = post?.title || 'pyndu logs()';
  const readingTime = post?.readingTime || '2 min read';
  const date = post?.date || new Date().toLocaleDateString();

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0a0a0c', // Darker background for contrast
          padding: '80px 120px',
        }}
      >
        {/* Decorative Grid / Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            top: -300,
            left: '30%',
            transform: 'translateX(-50%)',
            width: 1000,
            height: 600,
            background: '#a855f7',
            opacity: 0.15,
            filter: 'blur(150px)',
            borderRadius: '50%',
            zIndex: 1,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 10 }}>
          {/* Logo brand */}
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              fontWeight: 800,
              color: '#d8b4fe',
              letterSpacing: '-0.02em',
              marginBottom: 40,
              fontStyle: 'italic',
            }}
          >
            pyndu logs()
          </div>
          
          {/* Tags */}
          {post?.tags && post.tags.length > 0 && (
            <div style={{ display: 'flex', marginBottom: 20 }}>
              {post.tags.slice(0, 3).map((tag: string, index: number) => (
                <div
                  key={tag}
                  style={{
                    color: '#e9d5ff',
                    background: 'rgba(168, 85, 247, 0.15)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    padding: '8px 24px',
                    borderRadius: '100px',
                    fontSize: 20,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginRight: index < 2 ? 16 : 0, // Fallback for gap not being supported perfectly in all Vercel OG versions
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: 40,
              maxWidth: 960,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {title}
          </div>

          {/* Metadata Footer */}
          <div style={{ display: 'flex', color: '#9ca3af', fontSize: 26, fontWeight: 500, alignItems: 'center' }}>
             <span style={{ marginRight: 20 }}>{date}</span>
             <span style={{ color: '#4b5563', marginRight: 20 }}>•</span>
             <span>{readingTime}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
