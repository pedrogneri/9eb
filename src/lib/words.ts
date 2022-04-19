import { WORDS } from "./entries"
import { WHITE_LIST } from "./whitelist";

const wordsArray = WORDS.split(',');
const whiteListArray = WHITE_LIST.split(',');

const getRandomIndex = (min: number, max: number) => Math.trunc(Math.random() * (max - min) + min);

export const findWord = (value: string) => wordsArray.find(v => normalizeWord(v) === value);

export const normalizeWord = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

export const getRandomWord = (): string => {
  const randomWord = whiteListArray[getRandomIndex(0, whiteListArray.length - 1)];

  if (wordsArray.find((v) => v === randomWord)) {
    return randomWord;
  } 

  return getRandomWord();
}
