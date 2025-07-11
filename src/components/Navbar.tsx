import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SignIn from "./sign-in";
import { SignOut } from "./signout-button";
import { auth } from "@/lib/auth"; // Adjust the import path as necessary

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = async () => {
  const session = await auth();
  // Fetch the current session

  // Replace with actual admin check logic
  // Assuming user role is stored in session

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          MBlog
        </Link>
        <div className="flex items-center space-x-3 px-4 py-2">
          <Button variant="default" size="sm" asChild>
            <Link href="/admin/create" className="text-sm text-white">
              <Plus /> New Post
            </Link>
          </Button>
          <div>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || "User Avatar"}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={20}
                  className="w-56"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session?.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
