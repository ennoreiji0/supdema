import BackButton from "@/components/BackButton";
import { createClient } from "@/utils/server";
import { notFound, redirect} from "next/navigation";
import NormalButton from "@/components/NormalButton";
import { Post } from "@/utils/types";
import PostCard from "@/components/PostCard";
import { setSolve } from "@/utils/supabase";
import { SolveButton } from "@/components/SolveButton";
import Chat from "@/components/Chat";
import Header from "@/components/Header";



export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const supabase= await createClient()
  let isMyPost=false;
  let sendOK=false;
  const {data:{user}}=await supabase.auth.getUser()

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
    .eq('id',postId)
    .single()
  const post=data as any as Post
  console.log(post,error)
  if (error || !post) {
    notFound();
  }

  if(post.user_id===user?.id||!user){
    isMyPost=true;
  }

  if(user){
    sendOK=true;
  }
  
  return (
    <div>
      <Header/>
      <BackButton/>
      <div className="space-y-3 bg-slate-700 p-3">
        <PostCard post={post} userId={user?.id} cursor={false}/>
        <div className="text-sm">
          <SolveButton
            postId={post.id}
            userId={user?.id}
            action="solve"
            value="解決したい！"
            isMyPost={isMyPost}
          ></SolveButton>
          <div className="h-7"></div>
          <SolveButton
            postId={post.id}
            userId={user?.id}
            action="started"
            value="着手したよ！"
            isMyPost={isMyPost}
          ></SolveButton>
          <div className="h-7"></div>
          <SolveButton
            postId={post.id}
            userId={user?.id}
            action="cheer"
            value="応援！"
            isMyPost={isMyPost}
          ></SolveButton>
        </div>
      </div>
      <Chat postId={postId} sendOK={sendOK}/>
    </div>
  );
}