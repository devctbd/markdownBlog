import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AuthButton from "./AuthButton";

const Navbar = () => {
  const IsAdmin = true; // Replace with actual admin check logic

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          MBlog
        </Link>
        <div className="flex items-center space-x-3 px-4 py-2">
          {IsAdmin && (
            <Button variant="default" size="sm" asChild>
              <Link href="/admin/create" className="text-sm text-white">
                <Plus /> New Post
              </Link>
            </Button>
          )}
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
