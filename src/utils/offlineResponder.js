import knowledgeBase from '../../OpenAuxilium/src/data/knowledgeBase.json';

const entries = Array.isArray(knowledgeBase?.entries) ? knowledgeBase.entries : [];

const normalize = (text) =>
  (text || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

const isGreeting = (words) => words.some((w) => ['hi', 'hey', 'hello'].includes(w));
const isHowAreYou = (words) => words.join(' ').includes('how are you') || words.includes('hru');
const isQuoteIntent = (words) =>
  ['quote', 'pricing', 'estimate', 'cost', 'budget'].some((w) => words.includes(w));

const truncate = (text, max = 160) => {
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
};

const firstSentence = (text) => {
  if (!text) return '';
  const parts = text.split(/(?<=[.!?])\s+/);
  return parts[0] || text;
};

const projectFollowUp =
  'Tell me a sentence about your project (what it does, who uses it, timeframe) and I’ll suggest a plan.';

const scoreEntry = (words, entry) => {
  const fields = [];

  if (entry.question) fields.push(entry.question);
  if (Array.isArray(entry.questions)) fields.push(...entry.questions);
  if (Array.isArray(entry.keywords)) fields.push(...entry.keywords);
  if (Array.isArray(entry.tags)) fields.push(...entry.tags);
  if (entry.title) fields.push(entry.title);

  const haystackWords = new Set(normalize(fields.join(' ')));
  if (!haystackWords.size) return 0;

  return words.reduce((score, w) => score + (haystackWords.has(w) ? 1 : 0), 0);
};

export const getOfflineReply = (message) => {
  const words = normalize(message);
  if (!words.length) return null;

  if (isHowAreYou(words)) {
    return "Doing well and ready to help. What should we focus on—services, pricing, or your project?";
  }
  if (isGreeting(words)) {
    return 'Hey! What are you working on—services, pricing, or a project plan?';
  }
  if (isQuoteIntent(words)) {
    return 'I can help scope a quote. Share your SaaS idea (key features, users, timeline) and I’ll suggest next steps.';
  }

  let best = null;
  let bestScore = 0;

  for (const entry of entries) {
    const score = scoreEntry(words, entry);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  const promptForDetails =
    "Tell me what you're after—services, pricing, or your project—and I'll point you to details.";

  if (!best || bestScore === 0) {
    return promptForDetails;
  }

  if (best.answer) {
    const topic = best.title || best.question || 'this topic';
    const trimmed = truncate(firstSentence(best.answer));
    return `For ${topic}: ${trimmed} ${projectFollowUp}`;
  }

  return promptForDetails;
};
