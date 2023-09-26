import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import React from "react";

const getData = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      
    }
  })
}

function HistoryPage() {
  return <div>HistoryPage</div>;
}

export default HistoryPage;
