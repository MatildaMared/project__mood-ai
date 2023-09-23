import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { Prompt } from "next/font/google";
import z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    subject: z.string().describe("The subject of the journal entry."),
    summary: z
      .string()
      .describe("A quick summary of the entire journal entry."),
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
  console.log("Content", content);
  const formatInstructions = parser.getFormatInstructions();
  console.log("formattedInstructions", formatInstructions);
  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formatInstructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { formatInstructions },
  });

  const input = await prompt.format({ entry: content });
  console.log("input", input);
  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.call(input);
  console.log(result);
};
