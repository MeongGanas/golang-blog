export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  created_at: string;
}

export interface Discussion {
  id: number;
  userId: string;
  title: string;
  body: string;
  user: User;
  created_at: string;
  updated_at: string;
}
