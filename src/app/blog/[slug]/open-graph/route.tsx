import { ImageResponse } from 'next/og'
import { getPost } from '@/sanity/queries/posts'

export const runtime = 'edge'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params
    const post = await getPost(resolvedParams.slug)

    if (!post) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000',
              color: '#fff',
              fontFamily: 'system-ui',
              fontSize: 48,
            }}
          >
            <div>Post Not Found</div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    // Load custom fonts
    const ppNueueBold = await fetch(
      new URL('../../../../public/fonts/pp_nueue/ppneuemontreal-bold.otf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    const ppNikkeiRegular = await fetch(
      new URL('../../../../public/fonts/pp_nikkei/PPNikkeiMaru-Regular.otf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    const ppNikkeiLight = await fetch(
      new URL('../../../../public/fonts/pp_nikkei/PPNikkeiMaru-Light.otf', import.meta.url)
    ).then((res) => res.arrayBuffer())

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
            backgroundColor: '#000',
            color: '#fff',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Background gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
              zIndex: 1,
            }}
          />

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '1000px',
            }}
          >
            {/* Date */}
            <div
              style={{
                fontFamily: 'PPNikkeiLight',
                fontSize: '24px',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            {/* Title */}
            <div
              style={{
                fontFamily: 'PPNueueBold',
                fontSize: '64px',
                lineHeight: '1.1',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '16px',
              }}
            >
              {post.title}
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <div
                style={{
                  fontFamily: 'PPNikkeiRegular',
                  fontSize: '28px',
                  lineHeight: '1.4',
                  color: '#ccc',
                  maxWidth: '900px',
                }}
              >
                {post.excerpt}
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginTop: '24px',
                }}
              >
                {post.tags.slice(0, 3).map((tag: string) => (
                  <div
                    key={tag}
                    style={{
                      fontFamily: 'PPNueueBold',
                      fontSize: '16px',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '20px',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {/* Author info */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '80px',
                fontFamily: 'PPNikkeiRegular',
                fontSize: '20px',
                color: '#888',
                textAlign: 'right',
              }}
            >
              <div>Rijustone</div>
              <div style={{ fontSize: '16px', marginTop: '4px' }}>Developer & Designer</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'PPNueueBold',
            data: ppNueueBold,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'PPNikkeiRegular',
            data: ppNikkeiRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'PPNikkeiLight',
            data: ppNikkeiLight,
            style: 'normal',
            weight: 200,
          },
        ],
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: 'system-ui',
            fontSize: 48,
          }}
        >
          <div>Arighna Chakraborty — Blog Article</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
