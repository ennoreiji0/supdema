import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )

// supabase.ts
export async function getCurrentUser() {
  const supabase=createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) return null
  return user
}

export const saveDemand = async (content: string) => {
  if (!content) {
    alert("中身が空だ！何か書いて。");
    return false;
  }
  const supabase = createClient();
  const user=await getCurrentUser()
  const { data, error } = await supabase
    .from('posts')
    .insert([{ content:content ,user_id:user?.id }]);

  if (error) {
    console.error(error.message)
    return false;
  }else{
    console.log("OK!!!")
    return true;
  }
  //return data;
}

export const timeLine = async ()=>{
  const supabase=createClient();
  const {data,error}=await supabase
    .from('posts')
    .select(`
      id,
      content,
      created_at,
      users(
        username
      )
    `)
    .order('created_at',{ascending:false})
  if (error) {
    console.error(error.message)
    return false;
  }else{
    console.log("OK! I got posts.")
    return data;
  }
}

export const getPosts=async(name:string ,value:string)=>{
  const supabase=createClient()
  const {data,error}=await supabase
    .from('posts')
    .select('*')
    .eq(name,value)
  
  return data
}