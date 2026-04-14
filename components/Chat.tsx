import { createClient } from "@/utils/server"
import NormalButton from "./NormalButton"
import Fukidashi from "./Fukidashi"
import SendComment from "./SendComment";
import { ChatInfo } from "@/utils/types";
import ChatView from "./ChatView";


export default async function Chat({
  postId,
}:{
  postId:string
}){
  
  const supabase=await createClient()
  const {data:{user}}=await supabase.auth.getUser()
  const {data}=await supabase
    .from('comments')
    .select(`id,user_id,username,content`)
    .eq('post_id',postId)
    .order('created_at',{ascending:true})
    .returns<ChatInfo[]>()
  
  const {data:test}=await supabase
    .from('comments')
    .select('*')
    .eq('post_id',postId)
  
  const {data:username}=await supabase
    .from('users')
    .select(`username`)
    .eq('id',user?.id)
    .single()
  console.log("comment",test,data,postId)
  return (
    <div>
      <ChatView
        postId={postId}
        nowUserId={user?.id}
        initialComments={data??[]}
      />
      <SendComment
        username={username?.username}
        postId={postId}
        userId={user?.id}
      />
    </div>
  )
}