export type TextWeight = 'thin' | 'light' | 'regular' | 'medium' | 'bold';

export interface UserProfileData {
  id: string;
  username: string;
  name: string;
  posts: [Post];
}

export interface Post {
  id: string;
  owner: UserProfileData;
  content: string;
  comments: [Post];
  likes: [string];
  createdAt: string;
  isLiking: boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
