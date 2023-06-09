import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between bg-red-500 max-w-6xl">
        {/* left */}
        <div className="relative h-24 w-24">
          <Image src={"https://links.papareact.com/ocw"} alt="" fill />
        </div>

        {/* middle */}

        {/* right */}
      </div>
    </header>
  );
}
