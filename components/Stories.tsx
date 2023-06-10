import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";

export default function Stories() {
  // state
  const [suggestions, setSuggestions] = useState<SuggestionsType[]>([]);
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
