import { LETTER_STATE } from "../constants";
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

export const getTriesStates = (tries: string[][], word: string): LETTER_STATE[][] => {
  const wordLetters = normalizeWord(word).split('');

  const triesStates: LETTER_STATE[][] = tries.map((row) => {
    const inputLetters = normalizeWord(row.join('')).split('');

    return row.map((letter, index) => {
      const wordChar = wordLetters[index];

      if (wordChar === letter) {
        return LETTER_STATE.CORRECT;
      }
    
      if (wordLetters.includes(letter)) {
        let previousRepeat = 0;
    
        const inputMatches = inputLetters.filter((v, i) => {
          if (v === letter && i < index) {
            previousRepeat += 1;
          }
          return v === letter
        });
    
        if(inputMatches.length > 1) {
          const correctPositions = wordLetters.filter(
            (v, i) => v === inputLetters[i] && v === letter
          );
          const wordMatches = wordLetters.filter((v) => v === letter);
    
          if (
            (correctPositions.length < inputMatches.length && inputMatches.length < wordMatches.length) ||
            (previousRepeat >= wordMatches.length)
          ) {
            return LETTER_STATE.DEFAULT;
          }
        }
    
        return LETTER_STATE.CONTAIN;
      }
    
      return LETTER_STATE.DEFAULT;
    })
  });

  return triesStates;
}
