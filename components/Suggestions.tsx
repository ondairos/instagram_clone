/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";

export default function Suggestions() {
  // state for faker
  const [suggestions, setSuggestions] = useState<SuggestionsType[]>([]);

  //   useEffect with faker to bring random suggestions
  useEffect(() => {
    const mySuggestions = [...Array(5)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }));

    setSuggestions(mySuggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>

      {suggestions.map((element) => (
        <div
          className="flex items-center justify-between mt-3"
          key={element.id}
        >
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={element.avatar}
            alt=""
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{element.username}</h2>
            <h3 className="text-xs text-gray-400">
              Works at {element.company.name}
            </h3>
          </div>
          <button className=" text-blue-300 text-sm font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
}
