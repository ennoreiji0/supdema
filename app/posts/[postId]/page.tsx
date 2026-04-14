import BackButton from "@/components/BackButton";
import { createClient } from "@/utils/server";
import { notFound, redirect} from "next/navigation";
import NormalButton from "@/components/NormalButton";
import { Post } from "@/utils/types";
import PostCard from "@/components/PostCard";
import { setSolve } from "@/utils/supabase";
import { SolveButton } from "@/components/SolveButton";
import Chat from "@/components/Chat";



export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const supabase= await createClient()
  let isMyPost=false;

  const {data:{user}}=await supabase.auth.getUser()
  console.log(user)
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

  if(post.user_id===user?.id){
    isMyPost=true;
  }

  
  return (
    <div>
      <BackButton/>
      <div className="space-y-3 bg-slate-700 p-3">
        <PostCard post={post} userId={user?.id}/>
        <div className="text-sm">
          <SolveButton
            postId={post.id}
            userId={user?.id}
            action="solve"
            value="解決したい！"
            isMyPost={isMyPost}
          ></SolveButton>

          <SolveButton
            postId={post.id}
            userId={user?.id}
            action="started"
            value="着手したよ！"
            isMyPost={isMyPost}
          ></SolveButton>
        </div>
      </div>
      <Chat postId={postId}/>
    </div>
  );
}