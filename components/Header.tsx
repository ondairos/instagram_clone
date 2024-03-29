/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";

export default function Header() {
  const { data: session } = useSession();
  // console.log(session);
  // global State management value with Recoil package
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn();
  };

  return (
    <header className="shadow-md border-b bg-white sticky top-0 z-50">
      {/* left */}
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src={"https://links.papareact.com/ocw"}
            alt=""
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src={"https://links.papareact.com/jjm"}
            alt=""
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* middle search field*/}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navButton" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative navButton">
                <PaperAirplaneIcon className="navButton rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center animate-pulse">
                  5
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navButton"
              />
              <UserGroupIcon className="navButton" />
              <HeartIcon className="navButton" />

              <img
                onClick={handleSignOut}
                src={session?.user?.image ?? ""}
                alt="profile_pic"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button onClick={handleSignIn}>Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
}
