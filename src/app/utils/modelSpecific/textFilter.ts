import { badWords } from '../../constants/badWords';

// check bad words
export const filterBadWords = (text: string) => {
  const regex = new RegExp(`\\b(${badWords.join('|')})\\b`, 'gi');
  return regex.test(text);
};
