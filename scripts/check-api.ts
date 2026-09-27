import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function main() {
  console.log(`Testing Gemini API integration with model: ${AI.model}...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n✅ Gemini API check succeeded!\n");
    console.log("Roast critique:\n", result.roast);
    console.log(`\nIssues detected: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  [${idx + 1}] Line ${issue.line}: ${issue.title} (${issue.severity})`);
    });
    console.log("\nTakeaway:\n", result.takeaway);
    console.log("\nCorrected Code:\n", result.correctedCode);
  } catch (error) {
    console.error("\n❌ Gemini API check failed:");
    console.error((error as Error).message || error);
    process.exit(1);
  }
}

main();
