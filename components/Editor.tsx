"use client";
import { updateEntry } from "@/utils/api";
import { JournalEntry } from "@prisma/client";
import React, { useState } from "react";
import { useAutosave } from "react-autosave";

function Editor({ entry }: { entry: JournalEntry }) {
  const [value, setValue] = useState(entry.content);
  const [loading, setLoading] = useState(false);

  useAutosave({
    data: value,
    onSave: async (newValue: string) => {
      setLoading(true);
      console.log("Will update");
      const updated = await updateEntry(entry.id, newValue);
      console.log("Updated", updated);
      setLoading(false);
    },
  });

  return (
    <div className="w-full h-full">
      {loading && <div>...loading</div>}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-full p-8 text-xl outline-none"
      />
    </div>
  );
}

export default Editor;
