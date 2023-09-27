import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import React from "react";

const getData = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
  });

  const sentimentScoreSum = analyses.reduce(
    (acc, curr) => acc + curr.sentimentScore,
    0
  );

  const averageSentimentScore = Math.round(sentimentScoreSum / analyses.length);

  return { analyses, averageSentimentScore };
};

async function HistoryPage() {
  const { analyses, averageSentimentScore } = await getData();
  console.log(analyses);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div>{`Avg. Sentiment ${averageSentimentScore}`}</div>
      <div className="w-2/3 h-96">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
}

export default HistoryPage;
