"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="px-4 py-2 w-[95%]">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-200 rounded-xl">
        <Image
          src="/images/bmsceieeecsblack.png"
          width={100}
          height={100}
          alt="logo"
        />
        {status === "unauthenticated" ? (
          <button
            onClick={() => signIn("github")}
            className="bg-slate-800 hover:bg-slate-900 transition-all duration-150 px-4 py-2 rounded-lg"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <Image
              className="rounded-full"
              src={session?.user?.image as string}
              width={48}
              height={48}
              alt={session?.user?.name as string}
            />
            <button
              onClick={() => signOut()}
              className="bg-slate-800 hover:bg-slate-900 transition-all duration-150 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
