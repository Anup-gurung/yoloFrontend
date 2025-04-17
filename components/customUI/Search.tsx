"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center justify-center w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-[300px] sm:w-[400px] md:w-[500px] p-3 text-white bg-transparent border border-white rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
}
