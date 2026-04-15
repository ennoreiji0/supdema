import { createBrowserClient } from '@supabase/ssr'
import { TurborepoAccessTraceResult } from 'next/dist/build/turborepo-access-trace'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
  const { data: profile } = await supabase
  .from('users')
  .select('id')
  .eq('id', user?.id)
  .single();

if (!profile) {
  // プロフィールがなければ、この瞬間に作成！
  await supabase.from('profiles').insert({ 
    id: user?.id, 
    username: user?.user_metadata.full_name || '名無し' 
  });
}
  const { data, error } = await supabase
    .from('posts')
    .insert([{ content:content ,user_id:user?.id ,likes:1}])
    .select();
  //console.log(data);
  //alert(data)
  if (error) {
    console.error(error.message)
    return false;
  }else{
    console.log("OK!!!")
    return data;
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
      tags(
        tag_name
      ),
      user_id,
      users(
        username
      ),
      likes
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
    .select(`
      id,
      content,
      created_at,
      tags(
        tag_name
      ),
      user_id,
      users(
        username
      ),
      likes
    `)
    .eq(name,value)
    console.log(data)
  return data
}

/*export const getHashTags=async(postID:string)=>{
  const supabase=createClient()
  const {data,error}=await supabase
    .from('tags')
    .select('tag_name')
    .eq('post_id',postID)
  if(error){
    return false
  }else{
    return data;
  }
}*/

export const setHashTags=async(postID:string,tags:string[])=>{
  const supabase=createClient()
  for(let i=0;i<tags.length;i++){
    const {error}=await supabase
      .from('tags')
      .insert([{post_id:postID,tag_name:tags[i]}])
    if(error){
      console.log(error)
    }
  }
}

export const setSolve=async(userId:string,postId:string,action:string)=>{
  const supabase=createClient()
  const { data: existing } = await supabase
    .from('solve') // テーブル名は君の設定に合わせてな！
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .eq('action', action)
    .single()

  if(existing){
    const {error}=await supabase
      .from('solve')
      .delete()
      .eq('id',existing.id)
    if(error){
      console.log(error)
      return false
    }
    return true;
  }else{
    const {error}=await supabase
      .from('solve')
      .insert([{user_id:userId,post_id:postId,action:action}])
    if(error){
      console.log(error)
      return false
    }
    return true;
  }
  
  
}

