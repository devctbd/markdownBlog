import React from "react";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import { dummyPosts } from "../../dummeyPost";

const Home = async () => {
  const posts = dummyPosts || [];
  const loading = true;

  const users = await prisma.user.findMany({});

  console.log(users);

  return (
    <div className="min-h-screen bg-background container mx-auto p-4">
      <h1 className="text-4xl font-bold my-3">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
