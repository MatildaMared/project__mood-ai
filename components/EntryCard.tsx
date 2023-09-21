import { JournalEntry } from "@prisma/client";
import React from "react";

function EntryCard({ entry }: { entry: JournalEntry }) {
  const date = new Date(entry.createdAt).toLocaleDateString();

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:px-6">Summary</div>
      <div className="px-4 py-5 sm:px-6">Mood</div>
    </div>
  );
}

export default EntryCard;
