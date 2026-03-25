import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )

export const saveDemand = async (content: string) => {
  if (!content) {
    alert("中身が空だ！何か書いて。");
    return false;
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .insert([{ content:content}]);

  if (error) {
    console.error(error.message)
    return false;
  }else{
    console.log("OK!!!")
    return true;
  }
  //return data;
}