import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";
import React from "react";

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  analyze(`I'm going to give you a journal entry. I want you to analyze for a few things. I need the mood, a summary, what the subject is, a background color representing the mood, and a text color that gives a contrast ratio of at least 7.00:0 when used on top of the background color. You need to respond back with a formatted JSON like so: {"mood": "", "subject": "", "summary": "", "backgroundColor": "", "textColor": "", "negative": ""}
  
  entry:
  Today was a really great day. I opened a few packs of pokemon cards and had a glass of red wine. We also watched the movie Geostorm.
  `);
  return entries;
};

async function Page() {
  const entries = await getEntries();

  return (
    <div className="p-10 bg-zinc-50 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Page;
