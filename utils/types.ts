export type Post={
  id:string;
  content:string;
  created_at:string;
  tags:{
    tag_name:string;
  }[]
  users:{
    username:string;
  }
  user_id:string;
  likes:number
}