import { Topic, FlashcardData } from "../types";
import { STATIC_QUESTIONS, QuestionItem } from "../data/staticQuestions";
import { TOPIC_CODE_SNIPPETS, TOPIC_KEYWORDS, FALLBACK_SNIPPET } from "../data/topicConfiguration";

/**
 * Retrieves a list of questions filtered by the selected topic.
 * Uses keyword matching against the question tags.
 */
const getQuestionsByTopic = (topic: Topic): QuestionItem[] => {
  const keywords = TOPIC_KEYWORDS[topic] || [];

  const matching = STATIC_QUESTIONS.filter(q =>
    keywords.some(k => 
      q.tags.some(tag => tag.toLowerCase().includes(k) || k.includes(tag.toLowerCase()))
    )
  );

  return matching.length > 0 ? matching : STATIC_QUESTIONS;
};

/**
 * Generates a flashcard object from static data.
 * Simulates an async operation to mimic API behavior for better UX.
 */
export const generateFlashcard = async (topic: Topic): Promise<FlashcardData> => {
  // Simulate network latency for better UX perception
  await new Promise(resolve => setTimeout(resolve, 400));

  const questions = getQuestionsByTopic(topic);
  const randomQ = questions[Math.floor(Math.random() * questions.length)];
  
  // 1. Check for specific code snippet in the question
  // 2. Fallback to topic-level default snippet
  // 3. Fallback to generic snippet
  const topicCodes = TOPIC_CODE_SNIPPETS[topic] || FALLBACK_SNIPPET;
  const initialCode = randomQ.codeSnippet?.initial || topicCodes.initial;
  const solutionCode = randomQ.codeSnippet?.solution || topicCodes.solution;

  return {
    title: randomQ.tags[0] ? randomQ.tags[0].toUpperCase() : "CONCEPT",
    difficulty: 'Senior',
    
    // Content Mapping
    scenario_eng: randomQ.question,
    // Using English question for Myanmar view as well, as question translation wasn't provided
    // but the answer translation is available.
    scenario_mm: randomQ.question, 
    
    question_eng: "How would you explain this concept to a junior developer?",
    question_mm: "ဂျူနီယာ developer တစ်ယောက်ကို ဒီ concept အကြောင်း ဘယ်လိုရှင်းပြမလဲ။",
    
    code_snippet_initial: initialCode,

    solution_eng: randomQ.answer.en,
    solution_mm: randomQ.answer.mm,
    
    code_snippet_solution: solutionCode,
    
    key_takeaway_eng: `Focus on ${randomQ.tags.join(', ')} to improve maintainability.`,
    key_takeaway_mm: `${randomQ.tags.join(', ')} ကို နားလည်ထားရင် code ရေးရတာ ပိုကောင်းပါလိမ့်မယ်။`
  };
};