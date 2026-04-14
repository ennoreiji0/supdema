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
  let isSolved=false;
  let isStarted=false;

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

  if (user) {
    // DBにデータがあるかチェック
    const { data } = await supabase
      .from('solve')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .eq('action', 'solve')
      .single()
    if (data) isSolved = true // データがあれば「済み」
  }
  if (user) {
    // DBにデータがあるかチェック
    const { data } = await supabase
      .from('solve')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .eq('action', 'started')
      .single()
    if (data) isStarted = true // データがあれば「済み」
  }
  

  /*const { data: countSolve,error:error1 } = await supabase
  .rpc('get_count', { 
    target_post_id: postId, 
    target_action: 'solve'
  })

  const { data: countStarted,error:error2 } = await supabase
  .rpc('get_count', { 
    target_post_id: postId, 
    target_action: 'started'
  })*/
  /*
  const { data: fans, count:countSolve } = await supabase
  .from('solve')
  .select(`
    id,
    user_id,
    post_id,
    action,
    users (
      username
    )
  `, { count: 'exact' })
  .eq('post_id', postId)
  .eq('action','solve')
  .limit(10)
  .returns<FanWithUser[]>();



  const { data: developers, count:countStarted } = await supabase
  .from('solve')
  .select(`
    id,
    user_id,
    post_id,
    action,
    users (
      username
    )
  `, { count: 'exact' })
  .eq('post_id', postId)
  .eq('action','started')
  .limit(10)
  .returns<FanWithUser[]>();
  */
  return (
    <div>
      <BackButton/>
      <div className="space-y-3 bg-slate-700 p-3">
        <PostCard post={post} userId={user?.id}/>
        <div className="text-sm">
          <SolveButton
            postId={post.id}
            action="solve"
            value="解決したい！"
            isPushed={isSolved}
            isMyPost={isMyPost}
          ></SolveButton>

          <SolveButton
            postId={post.id}
            action="started"
            value="着手したよ！"
            isPushed={isStarted}
            isMyPost={isMyPost}
          ></SolveButton>
        </div>
      </div>
      <Chat postId={postId}/>
    </div>
  );
}