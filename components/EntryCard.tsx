import React from "react";

function EntryCard({ entry }) {
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6">{entry}</div>
    </div>
  );
}

export default EntryCard;
