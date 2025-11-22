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

const truncate = (text, max = 360) => {
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
};

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
    return "I'm doing well and ready to help. Want to chat services, pricing, or a project you're planning?";
  }
  if (isGreeting(words)) {
    return 'Hey there! Looking for services, pricing, or help planning a project? Tell me and I’ll tailor it for you.';
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
    "Happy to help. What should we dive into—services, pricing, or a project you're planning? Tell me and I'll tailor the answer.";

  if (!best || bestScore === 0) {
    return promptForDetails;
  }

  if (best.answer) {
    const topic = best.title || best.question || 'this topic';
    const trimmed = truncate(best.answer);
    return [
      `I can help with ${topic}:`,
      trimmed,
      'Want to go deeper on services, pricing, or the project you have in mind?',
    ].join('\n\n');
  }

  return promptForDetails;
};
