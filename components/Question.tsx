"use client";

import { useState } from "react";

function Question() {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask a question"
        onChange={handleChange}
        className="border border-black/10 px-4 py-2 text-lg rounded-lg mr-2 w-[500px] max-w-full"
      />
      <button
        type="submit"
        className="bg-pink-500 px-4 py-2 rounded-lg text-lg text-white"
      >
        Ask
      </button>
    </form>
  );
}

export default Question;
