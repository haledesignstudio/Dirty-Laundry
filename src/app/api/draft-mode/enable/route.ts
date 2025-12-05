import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const secret = searchParams.get('secret')
  const sanityPreviewSecret = searchParams.get('sanity-preview-secret')
  const slug =
    searchParams.get('slug') ||
    searchParams.get('sanity-preview-pathname') ||
    '/'

  if (secret && secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!secret && !sanityPreviewSecret) {
    return NextResponse.json({ message: 'Missing secret' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  // ✅ Use environment variable for production-safe redirect
  const redirectUrl = new URL(
    slug,
    process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin
  )

  return NextResponse.redirect(redirectUrl)
}
