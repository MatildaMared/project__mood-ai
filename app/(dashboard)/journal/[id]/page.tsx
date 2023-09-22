import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import React from "react";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user?.id,
        id: id,
      },
    },
  });

  return entry;
};

async function EntryPage({ params }: { params: { id: string } }) {
  const entry = await getEntry(params.id);
  const analysisData = [
    { name: "Summary", value: "Summary text...." },
    { name: "Subject", value: "Subject text...." },
    { name: "Mood", value: "Mood text...." },
    { name: "Negative", value: "Negative text...." },
  ];

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry!} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-pink-300 px-6- py-10">
          <h2 className="text-2xl">Analysis</h2>
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

export default EntryPage;
