/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function MiniProfile() {
  const { data: session } = useSession();
  // console.log(session);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="rounded-full border p-[2px] w-16 h-16"
        src={session?.user?.image ?? ""}
        alt=""
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">
          {
            // @ts-ignore
            session?.user?.username
          }
        </h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button
        onClick={handleSignOut}
        className="text-blue-400 text-sm font-semibold"
      >
        Sign Out
      </button>
    </div>
  );
}
