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

export type ChatInfo={
  id:string;
  user_id:string;
  username:string;
  content:string
}

export type FanWithUser = {
  id: string;
  user_id: string;
  users: {
    username: string;
  } | null; 
};