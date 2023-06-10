import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

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
    <div>
      {/* Stories */}
      <p>Stories</p>
    </div>
  );
}
