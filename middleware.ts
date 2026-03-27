import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // ここで直接クライアントを作るのが一番確実だ
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
      },
    }
  )

const { data: { user } } = await supabase.auth.getUser()
const { pathname } = request.nextUrl

// 1. ログインしてなくても見れる「公開ページ」をリストにする
const publicPaths = ['/'] // 他に増やしたければ ['/', '/about', '/contact'] みたいにする

const isPublicPath = publicPaths.includes(pathname)

// 2. ログインしていない 且つ 公開ページじゃない場所にアクセスしようとしたら -> TOPへ
if (!user && !isPublicPath) {
  console.log("★★★ 未ログインなのでブロック:", pathname)
  return NextResponse.redirect(new URL('/', request.url))
}

// 3. ログインしている 且つ TOP(ログイン画面)にいたら -> dashboardへ
if (user && pathname === '/') {
  return NextResponse.redirect(new URL('/dashboard', request.url))
}

return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}