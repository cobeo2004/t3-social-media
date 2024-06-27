"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SidebarNavigation = (): JSX.Element => {
  const sess = useSession();
  const user = sess.data?.user;
  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user !== undefined && (
          <li>
            <Link href={`/profiles/${user?.id}`}>Profile</Link>
          </li>
        )}
        {user === undefined ? (
          <li>
            <button onClick={() => void signIn()}>Log In</button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
