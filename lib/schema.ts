import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A witty, deadpan Hinglish critique of the code.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of issues found in the code, ordered by severity.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number of the issue.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short title of the problem.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "The exact problematic snippet from the code.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Why this code is broken or problematic.",
          },
          expected: {
            type: Type.STRING,
            description: "What should be done instead.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete corrected source code without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A memorable one-liner takeaway in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
