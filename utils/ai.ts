import { loadQARefineChain } from "langchain/chains";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Prompt } from "next/font/google";
import z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    subject: z.string().describe("The subject of the journal entry."),
    sentimentScore: z.number().describe("Sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."),
    summary: z
      .string()
      .describe(
        "A quick summary of the entire journal entry, max 200 characters."
      ),
    mood: z
      .string()
      .describe("The mood of the person who wrote the journal entry."),
    negative: z
      .boolean()
      .describe(
        "Is the journal entry negative? (i.e does it contain negative emotions?)."
      ),
    backgroundColor: z
      .string()
      .describe(
        "A hexadecimal color code that represents the mood of the journal entry. The color should be a darker pastel."
      ),
    textColor: z
      .string()
      .describe(
        "A hexadecimal color code that can be used for text placed on top of the background color. It should have a contrast ratio of at least 4.5:1 against the background color."
      ),
  })
);

const getPrompt = async (content: string) => {
  const formatInstructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! The summary, subject and mood should be in the same language that the journal entry was written in. \n{formatInstructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { formatInstructions },
  });

  const input = await prompt.format({ entry: content });
  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (err) {
    console.log(err);
  }
};

export const qa = async (question, entries) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        id: entry.id,
        createdAt: entry.createdAt,
      },
    });
  });

  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question);
  const response = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  return response.output_text;
};
