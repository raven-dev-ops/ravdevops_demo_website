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
const projectKeywords = ['project', 'product', 'build', 'plan', 'launch', 'saas', 'app'];
const isProjectIntent = (words) => words.some((w) => projectKeywords.includes(w));

const truncate = (text, max = 140) => {
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
};

const firstSentence = (text) => {
  if (!text) return '';
  const parts = text.split(/(?<=[.!?])\s+/);
  return parts[0] || text;
};

const projectFollowUp =
  'Give me one line on what it does, who uses it, and your timeframe. I will suggest a next step.';
const promptForDetails =
  'Tell me what you need—services, pricing, or your project—and I will point you to the right details.';
const MIN_MATCH_SCORE = 2;

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
    return 'Doing well and ready to help. Should we talk services, pricing, or your project?';
  }
  if (isGreeting(words)) {
    return 'Hey! What are you working on—services, pricing, or a project idea?';
  }
  if (isQuoteIntent(words)) {
    return 'I can help scope a quote. Share the idea, target users, and timeline, and I will suggest next steps.';
  }
  if (isProjectIntent(words)) {
    return projectFollowUp;
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

  if (!best || bestScore < MIN_MATCH_SCORE) {
    return promptForDetails;
  }

  if (best.answer) {
    const topic = best.title || best.question || 'this topic';
    const trimmed = truncate(firstSentence(best.answer));
    return `For ${topic}: ${trimmed} ${projectFollowUp}`;
  }

  return promptForDetails;
};
