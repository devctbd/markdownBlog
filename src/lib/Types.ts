export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date | string | number;
  author: {
    name: string;
    image: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
}
