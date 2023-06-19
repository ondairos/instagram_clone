import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

export default function Stories() {
  // state
  const [suggestions, setSuggestions] = useState<SuggestionsType[]>([]);
  // session state
  const { data: session } = useSession();
  // populate a list of fake users
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thumb-black">
      {/* Stories */}
      {/* show own individual story */}
      {session && (
        <Story
          img={session?.user?.image || ""}
          username={
            // @ts-ignore
            session?.user?.username ?? ""
          }
        />
      )}
      {suggestions.map((element) => (
        <Story
          key={element.id}
          img={element.avatar}
          username={element.username}
        />
      ))}
    </div>
  );
}
