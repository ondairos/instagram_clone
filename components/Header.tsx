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
import ProfilePic from "../public/profile_pic.jpg";

export default function Header() {
  return (
    <header className="shadow-md border-b bg-white sticky top-0 z-50">
      {/* left */}
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <Image
            src={"https://links.papareact.com/ocw"}
            alt=""
            fill
            objectFit="contain"
          />
        </div>

        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            src={"https://links.papareact.com/jjm"}
            alt=""
            fill
            objectFit="contain"
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
          <HomeIcon className="navButton" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <div className="relative navButton">
            <PaperAirplaneIcon className="navButton rotate-45" />
            <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center animate-pulse">
              3
            </div>
          </div>
          <PlusCircleIcon className="navButton" />
          <UserGroupIcon className="navButton" />
          <HeartIcon className="navButton" />

          <Image
            className="w-8 rounded-full cursor-pointer"
            src={ProfilePic}
            alt="profile_pic"
          />
        </div>
      </div>
    </header>
  );
}
