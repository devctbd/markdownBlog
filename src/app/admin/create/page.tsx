"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreatePostPage = () => {
  const router = useRouter();
  const [preview, setPreview] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, published }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      toast.success("Post created successfully");
    } catch (error: any) {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }

    setTitle("");
    setContent("");
    setPublished(false);

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4">
        <header className="my-6 border-b">
          <div className="flex items-center space-x-2 my-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Link>
            </Button>
          </div>
        </header>

        {/* end header  */}
        <main>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">Create New Post</h1>
              <Button variant="outline" onClick={() => setPreview(!preview)}>
                <Eye className="h-4 w-4 mr-2" />
                {preview ? "Edit" : "Preview"}
              </Button>
            </div>
            {/* grid  */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Write Post</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Post Title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter Post Content"
                        rows={20}
                        required
                        className="min-h-80"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="published" onCheckedChange={setPublished} />
                      <Label htmlFor="published">Published</Label>
                    </div>
                    <Button
                      type="submit"
                      variant={"outline"}
                      size={"sm"}
                      className="cursor-pointer"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Post"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              {preview && (
                <Card>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{content}</CardDescription>
                    <CardAction>Card Action</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p>{content} </p>
                  </CardContent>
                  <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePostPage;
