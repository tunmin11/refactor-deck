import { GoogleGenAI, Type } from "@google/genai";
import { Topic, FlashcardData } from "../types";
import { STATIC_QUESTIONS, QA } from "../data/staticQuestions";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a Senior Principal Engineer acting as a mentor. 
Your goal is to generate high-quality, advanced programming flashcards for senior developers.

IMPORTANT: Translations for Myanmar (Burmese) must be in a "Casual Technical Spoken Style" (Yangon/Mandalay Tech Bro style).
- Use "တယ်", "မယ်", "နော်" sentence endings instead of literary "သည်", "မည်".
- Do NOT translate technical terms (e.g., keep "Class", "Object", "Signal", "Observable", "Prop Drilling" in English).
- Explanation should feel like a senior dev chatting with a colleague.

The content should be challenging, focusing on "Why" and "How".
Include code snippets where relevant to show "Before" (bad code) and "After" (refactored code).
`;

// Helper to find a relevant question from the static list
const getStaticQuestion = (topic: Topic): QA | null => {
  let keywords: string[] = [];
  
  switch(topic) {
    case Topic.CLEAN_CODE: keywords = ['clean code', 'principles', 'smell', 'career']; break;
    case Topic.DESIGN_PATTERNS: keywords = ['design patterns', 'creational', 'structural', 'behavioral', 'singleton', 'factory', 'observer', 'strategy']; break;
    case Topic.REFACTORING: keywords = ['refactoring', 'clean code', 'smell']; break;
    case Topic.ARCHITECTURE: keywords = ['architecture', 'di', 'clean', 'layer']; break;
    case Topic.SOLID: keywords = ['solid', 'srp', 'ocp', 'lsp', 'isp', 'dip']; break;
    case Topic.REACT_PATTERNS: keywords = ['react']; break;
    case Topic.ANGULAR: keywords = ['angular', 'rxjs', 'signals']; break;
    case Topic.TYPESCRIPT: keywords = ['typescript', 'generics']; break;
    default: keywords = [];
  }

  // Filter questions that match at least one keyword
  const matching = STATIC_QUESTIONS.filter(q => 
    keywords.some(k => q.tags.some(tag => tag.includes(k) || k.includes(tag)))
  );

  if (matching.length > 0) {
    return matching[Math.floor(Math.random() * matching.length)];
  }
  
  // If no specific match, maybe return a random one occasionally or return null to let AI generate
  return Math.random() > 0.5 ? STATIC_QUESTIONS[Math.floor(Math.random() * STATIC_QUESTIONS.length)] : null;
};

export const generateFlashcard = async (topic: Topic): Promise<FlashcardData> => {
  const model = "gemini-3-flash-preview";
  const baseQuestion = getStaticQuestion(topic);

  let prompt = "";
  
  if (baseQuestion) {
    prompt = `
      I have a specific Question and Answer pair to turn into a flashcard.
      Question: "${baseQuestion.q}"
      Answer: "${baseQuestion.a}"
      
      Please expand this into a full flashcard structure. 
      1. Use the Question provided as the 'question_eng'.
      2. Translate it to casual Burmese for 'question_mm'.
      3. Create a realistic coding scenario for this concept.
      4. Provide detailed solutions and code examples (Bad vs Good code) based on this concept.
    `;
  } else {
    prompt = `Generate a challenging flashcard about ${topic} for a Senior Developer.
    It should present a scenario or a snippet of code that needs improvement.`;
  }

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A short, punchy title for the concept" },
          difficulty: { type: Type.STRING, enum: ["Junior", "Mid", "Senior"] },
          scenario_eng: { type: Type.STRING, description: "The context or problem statement in English" },
          scenario_mm: { type: Type.STRING, description: "The context or problem statement in Casual Spoken Myanmar" },
          question_eng: { type: Type.STRING, description: "The specific question" },
          question_mm: { type: Type.STRING, description: "The specific question in Casual Spoken Myanmar" },
          code_snippet_initial: { type: Type.STRING, description: "Optional: The code that needs refactoring (language: typescript/javascript)" },
          solution_eng: { type: Type.STRING, description: "Detailed explanation of the solution in English" },
          solution_mm: { type: Type.STRING, description: "Detailed explanation of the solution in Casual Spoken Myanmar" },
          code_snippet_solution: { type: Type.STRING, description: "Optional: The refactored/better code" },
          key_takeaway_eng: { type: Type.STRING, description: "One sentence summary in English" },
          key_takeaway_mm: { type: Type.STRING, description: "One sentence summary in Casual Spoken Myanmar" }
        },
        required: ["title", "scenario_eng", "scenario_mm", "question_eng", "question_mm", "solution_eng", "solution_mm", "key_takeaway_eng", "key_takeaway_mm"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as FlashcardData;
  }
  
  throw new Error("Failed to generate flashcard");
};