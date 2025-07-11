"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/lib/Types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, MessageCircleQuestionMark } from "lucide-react";

const PostCard = ({ post }: { post: Post }) => {
  const likeLoading = false; // Placeholder for like loading state
  const liked = true; // Placeholder for liked state

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={post.author.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{post.author.name}</h3>
            <div className="text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        <CardTitle className="mt-2">
          <Link className="hover:underline" href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.content}
        </p>
      </CardContent>
      <CardFooter className="flex items-center space-x-4">
        <CardAction>
          <Button variant="outline" size={"sm"}>
            <Heart
              className={`w-4 h-4 ${
                likeLoading ? "animate-pulse" : liked ? "fill-red-500" : ""
              }`}
            />
            <span>{post._count.likes}</span>
          </Button>
        </CardAction>
        <CardAction>
          <Button variant="outline" size={"sm"}>
            <MessageCircleQuestionMark />
            <span>{post._count.comments} </span>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
