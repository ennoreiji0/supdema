
export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  return (
    <div>
      <h1>投稿ID: {postId}</h1>
      <p>ここでIDに基づいたデータをフェッチしたりするぜ。</p>
    </div>
  );
}