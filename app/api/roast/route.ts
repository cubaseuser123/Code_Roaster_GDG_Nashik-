import { NextRequest, NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel, RoastRequest } from "@/types/roast";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const payload = (body && typeof body === "object" ? body : {}) as Record<
    string,
    unknown
  >;

  const rawCode = typeof payload.code === "string" ? payload.code : "";
  const rawErrorMessage =
    typeof payload.errorMessage === "string" ? payload.errorMessage.trim() : "";

  // 1. Validate empty code
  if (rawCode.trim().length === 0) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  // 2. Validate code length
  if (rawCode.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 3. Validate error message length
  if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Silently fall back to defaults if unknown
  const isKnownLanguage = LANGUAGES.some((l) => l.id === payload.language);
  const language: LanguageId = isKnownLanguage
    ? (payload.language as LanguageId)
    : DEFAULTS.language;

  const isKnownRoastLevel = ROAST_LEVELS.some((r) => r.id === payload.roastLevel);
  const roastLevel: RoastLevel = isKnownRoastLevel
    ? (payload.roastLevel as RoastLevel)
    : DEFAULTS.roastLevel;

  const roastRequest: RoastRequest = {
    language,
    code: rawCode,
    roastLevel,
    errorMessage: rawErrorMessage || undefined,
  };

  try {
    const result = await analyzeCode(roastRequest);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("API /api/roast error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to analyze code.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
