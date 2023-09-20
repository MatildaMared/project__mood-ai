import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
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
  return entries;
};

async function Page() {
  const entries = await getEntries();
  console.log("entries", entries);
  return <div>Journal</div>;
}

export default Page;
