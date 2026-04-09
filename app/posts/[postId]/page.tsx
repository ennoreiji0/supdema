import BackButton from "@/components/BackButton";
import { createClient } from "@/utils/server";
import { notFound } from "next/navigation";
import NormalButton from "@/components/NormalButton";
import { increaseLike } from "@/utils/handlePost";
import GoodButton from "@/components/GoodButton";
import { Post } from "@/utils/types";
import PostCard from "@/components/PostCard";
export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const supabase= await createClient()

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

  return (
    <div>
      <BackButton/>
      <div className="space-y-3 bg-slate-700 p-3">
        <PostCard post={post} userId={user?.id}/>
        <div className="text-sm">
          <NormalButton>つくってみたい！</NormalButton>
          <NormalButton>つくりはじめたよ</NormalButton>
        </div>
      </div>
    </div>
  );
}