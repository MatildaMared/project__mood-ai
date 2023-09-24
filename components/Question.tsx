"use client";

import { useState } from "react";

function Question() {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Ask a question"
        onChange={onChange}
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
