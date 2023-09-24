"use client";
import { updateEntry } from "@/utils/api";
import { Analysis, JournalEntry } from "@prisma/client";
import React, { useState } from "react";
import { useAutosave } from "react-autosave";

function Editor({ entry }: { entry: JournalEntry }) {
  const [value, setValue] = useState(entry.content);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const {
    mood,
    summary,
    textColor,
    backgroundColor,
    subject,
    negative,
    moodScore,
  } = analysis as Analysis;

  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative.toString() },
  ];

  useAutosave({
    data: value,
    onSave: async (newValue: string) => {
      setLoading(true);
      const data = await updateEntry(entry.id, newValue);
      setAnalysis(data.analysis);
      setLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        {loading && <div>...loading</div>}
      </div>
      <div className="col-span-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-full p-8 text-xl outline-none"
        />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6- py-10" style={{ backgroundColor }}>
          <h2 className="text-2xl" style={{ color: textColor }}>
            Analysis
          </h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Editor;
