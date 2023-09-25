"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";

function Question() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const answer = await askQuestion(value);

    console.log(answer);
    setValue("");
    setAnswer(answer);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        disabled={loading}
        value={value}
        type="text"
        placeholder="Ask a question"
        onChange={handleChange}
        className="border border-black/10 px-4 py-2 text-lg rounded-lg mr-2 w-[500px] max-w-full"
      />
      <button
        disabled={loading}
        type="submit"
        className="bg-pink-500 px-4 py-2 rounded-lg text-lg text-white"
      >
        Ask
      </button>
      {loading && <div>...loading</div>}
      {answer && <div>{answer}</div>}
    </form>
  );
}

export default Question;
