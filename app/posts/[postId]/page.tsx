import BackButton from "@/compornents/BackButton";
import { createClient } from "@/utils/supabase";
import { notFound } from "next/navigation";
import NormalButton from "@/compornents/NormalButton";
import { increaseLike } from "@/utils/handlePost";
import GoodButton from "@/compornents/GoodButton";

type Post={
  id:string;
  content:string;
  created_at:string;
  tags:{
    tag_name:string;
  }[]
  users:{
    username:string;
  }
  likes:number
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
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
      users(
        username
      ),
      likes
    `)
    .eq('id',postId)
    .single()
  
  const post=data as any as Post

  if (error || !post) {
    notFound();
  }

  return (
    <div>
      <BackButton/>
      <div className="space-y-3">
      <p className="text-sm font-bold text-slate-300">{post.users?.username}</p>
      <p>{post.content}</p>
          <div className="text-base text-[#77a9f8] space-x-1">
            {post.tags?.map((t) => (
              <span key={t.tag_name}>#{t.tag_name}</span>
            ))}
          </div>
          <span className="text-sm">
            {new Date(post.created_at).toLocaleString()}
          </span>
          <span className="ml-3 text-sm">
            <GoodButton
              postId={post.id}
              likes={post.likes}
            />
            
          </span>
        </div>
    </div>
  );
}