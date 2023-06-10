import React, { useEffect } from "react";
import { faker } from "@faker-js/faker";

export default function Stories() {
  // populate a list of fake users
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }));

    console.log(suggestions);
  }, []);

  return (
    <div>
      {/* Stories */}
      <p>Stories</p>
    </div>
  );
}
