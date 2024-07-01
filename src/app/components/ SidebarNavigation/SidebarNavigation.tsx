"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import IconHoverEffect from "../functions/IconHover.effect";
import { VscAccount, VscHome, VscSignOut, VscSignIn } from "react-icons/vsc";

const SidebarNavigation = (): JSX.Element => {
  const sess = useSession();
  const user = sess.data?.user;
  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <IconHoverEffect red={false}>
              <span className="flex items-center gap-4">
                <VscHome className="h-8 w-8" />
                <span className="hidden text-lg md:inline">Home</span>
              </span>
            </IconHoverEffect>
          </Link>
        </li>
        {user !== undefined && (
          <li>
            <Link href={`/profiles/${user?.id}`}>
              {" "}
              <IconHoverEffect red={false}>
                <span className="flex items-center gap-4">
                  <VscAccount className="h-8 w-8" />
                  <span className="hidden text-lg md:inline">Profile</span>
                </span>
              </IconHoverEffect>
            </Link>
          </li>
        )}
        {user === undefined ? (
          <li>
            <button onClick={() => void signIn()}>
              <IconHoverEffect red={false}>
                <span className="flex items-center gap-4">
                  <VscSignIn className="h-8 w-8 fill-green-700" />
                  <span className="hidden fill-green-700 text-lg md:inline">
                    Log In
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
              <IconHoverEffect red={false}>
                <span className="flex items-center gap-4 ">
                  <VscSignOut className="h-8 w-8 fill-red-700" />
                  <span className="hidden fill-red-700 text-lg md:inline">
                    Log Out
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
