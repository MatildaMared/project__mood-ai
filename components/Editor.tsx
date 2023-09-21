"use client";
import { JournalEntry } from "@prisma/client";
import React, { useState } from "react";

function Editor({ entry }: { entry: JournalEntry }) {
  const [value, setValue] = useState(entry.content);

  return (
    <div className="w-full h-full">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-full p-8 text-xl outline-none"
      />
    </div>
  );
}

export default Editor;
