import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { Analysis } from "@prisma/client";
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
    include: {
      analysis: true,
    },
  });

  return entry;
};

async function EntryPage({ params }: { params: { id: string } }) {
  const entry = await getEntry(params.id);

  return (
    <div className="h-full w-full">
      <Editor entry={entry!} />
    </div>
  );
}

export default EntryPage;
