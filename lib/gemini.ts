import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const errObj = error as { message?: string; status?: number };
  const effectiveStatus = status ?? errObj?.status;

  switch (effectiveStatus) {
    case 400:
      return "Invalid request to Gemini API. Check prompt schema or payload format.";
    case 403:
      return "Access denied. Your GEMINI_API_KEY in .env.local may be invalid or lacks permissions. Verify your key at https://aistudio.google.com/apikey.";
    case 404:
      return `Model not found (${AI.model}). Verify AI.model in config/app.config.ts.`;
    case 429:
      return "Rate limit exceeded. Bhai, itni bhi jaldi kya hai? Too many requests. Please wait a few moments and try again.";
    case 503:
      return "Gemini service temporarily overloaded. Auto-retries exhausted. Please try again in a moment.";
    default:
      return `Gemini API error: ${errObj?.message || "An unexpected error occurred during code analysis."}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim() === "") {
        throw new Error("Gemini returned an empty response.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        throw new Error("Failed to parse Gemini response as JSON.");
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: unknown) {
      lastError = err;
      const status = (err as { status?: number; statusCode?: number })?.status ??
                     (err as { status?: number; statusCode?: number })?.statusCode;

      if (status === 503 && attempt < AI.maxAttempts) {
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      const message = friendlyErrorMessage(status, err);
      throw new Error(message);
    }
  }

  throw new Error(friendlyErrorMessage(503, lastError));
}
