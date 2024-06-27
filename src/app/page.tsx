"use client";
import { SessionProvider } from "next-auth/react";
import SidebarNavigation from "./components/ SidebarNavigation/SidebarNavigation";
import NewTweetForm from "./components/NewTweetForm";
import { Session } from "inspector";

export default function Home() {
  return (
    <SessionProvider>
      <div className="container mx-auto flex items-start sm:pr-4">
        <SidebarNavigation />
        <div className="min-h-screen flex-grow border-x">
          <header className="sticky top-0 z-10 border-b bg-white pt-2">
            <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
          </header>
          <NewTweetForm />
        </div>
      </div>
    </SessionProvider>
  );
}
