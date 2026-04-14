import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import SearchForm from "@/components/SearchForm";
import { createClient } from "@/utils/server";
import { Post } from "@/utils/types";
type Result={
  post_id:string;
  posts:Post|null;
}

export default async function SearchHashTag({
  searchParams,
}:{
  searchParams:Promise<{tag?:string}>;
}){
  const tag=(await searchParams).tag;
  let results:Result[]=[];
  const supabase=await createClient()
  if(tag){
    const {data}=await supabase
      .from('tags')
      .select(`
          post_id,
          posts(
            id,
            content,
            created_at,
            user_id,
            likes,
            users ( username ),
            tags ( tag_name )
          )
        `)
      .eq('tag_name',tag)
      .returns<Result[]>()
    results=data || [];
  }

  const validResults = results.filter(
    (item): item is Result & { posts: Post } => item.posts !== null
  );

  const {data:{user}}=await supabase.auth.getUser()

  return (
    <div>
      <Header/>
      <SearchForm initialValue={tag||''}/>
      
      <div>
        {!tag ? (
          <>
          </>
        ) : results.length > 0 ? (
          <div className="grid gap-4">
            {validResults.map((item) => (
              <PostCard key={item.post_id} post={item.posts} userId={user?.id}/>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">「{tag}」に一致する投稿は見つかりませんでした</p>
        )}
      </div>
    </div>
  )
}