'use client'

import { createClient } from '@/utils/supabase'
import { createBrowserClient } from '@supabase/ssr'
import NormalButton from './NormalButton'

export default function GoogleLoginButton() {
  // ブラウザ用のクライアントを作成
  const supabase = createClient()
  const handleLogin = async () => {
    const {error}=await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // ログイン後に戻ってくるURL
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
    if(!error){
      const {data:{user}}=await supabase.auth.getUser()
      const { error } = await supabase
        .from('users')
        .upsert([{ id:user?.id ,username:'名無し' }]);
    }
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