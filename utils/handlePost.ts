import { createClient } from "./supabase";


export const increaseLike=async(postId:string)=>{
    const supabase=createClient()
    const {error}=await supabase.rpc('increment_likes',{
      row_id:postId
    })
    if(error){
      console.log(error)
      return error
      
    }
    return false
  }