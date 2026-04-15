'use client'

import { createClient } from '@/utils/supabase'
import { createBrowserClient } from '@supabase/ssr'
import NormalButton from './NormalButton'

export default function GoogleLoginButton() {
  // ブラウザ用のクライアントを作成
  const supabase = createClient()
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // ログイン後に戻ってくるURL
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
  }

return (
    <div> 
      <NormalButton
        onClick={handleLogin}
        >
        Googleでログイン
      </NormalButton>
    </div>
  )
}