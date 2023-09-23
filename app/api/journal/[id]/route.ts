import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await getUserByClerkId();
  const { content } = await request.json();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updatedEntry.content);

  await prisma.analysis.update({
    where: {
      entryId: updatedEntry.id,
    },
    data: {
      entryId: updatedEntry.id,
      ...analysis,
    },
  });

  return NextResponse.json({ data: updatedEntry });
};
