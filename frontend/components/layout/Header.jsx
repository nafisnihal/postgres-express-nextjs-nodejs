"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Moon, Sun } from "lucide-react";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  // Minimal dark mode toggle
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  const handleLogin = () => router.push("/login");
  const handleHome = () => router.push("/");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="max-w-2xl mx-auto px-4 flex h-14 items-center justify-between">
        {/* Logo */}
        <button
          onClick={handleHome}
          className="flex items-center gap-2 focus:outline-none"
        >
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold text-foreground">TodoApp</span>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="w-8 h-8"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer select-none">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleLogin} size="sm" variant="outline">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
