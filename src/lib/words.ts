import { HistoryRegistry } from "../store";
import { LETTER_STATE, WORDS, WHITE_LIST } from "../constants"

const wordsArray = WORDS.split(',');
const whiteListArray = WHITE_LIST.split(',');

const getRandomIndex = (min: number, max: number) => Math.trunc(Math.random() * (max - min) + min);

export const findWord = (value: string) => wordsArray.find(v => normalizeWord(v) === value);

export const normalizeWord = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

export const getRandomWord = (history: HistoryRegistry[]): string => {
  const randomWord = whiteListArray[getRandomIndex(0, whiteListArray.length - 1)];
  const isValidWord = wordsArray.find((v) => v === randomWord);
  const alreadyPlayedWord = history.some(({ word }) => word === randomWord);

  if (isValidWord && !alreadyPlayedWord) {
    return randomWord;
  } 

  return getRandomWord(history);
}

export const getTriesStates = (tries: string[][], word: string): LETTER_STATE[][] => {
  const wordLetters = normalizeWord(word).split('');
  const triesStates: LETTER_STATE[][] = [];

  tries.forEach((row, i) => {
    const inputLetters = normalizeWord(row.join('')).split('');
    triesStates.push([])

    inputLetters.forEach((letter, index) => {
      const correctLetter = wordLetters[index] === letter;

      if (correctLetter) {
        triesStates[i].push(LETTER_STATE.CORRECT);
        return
      }
    
      if (wordLetters.includes(letter)) {
        const letterMatches = wordLetters.filter((v) => v === letter)
        const prevContainStates = triesStates[i].filter((v, i) => v === LETTER_STATE.CONTAIN && row[i] === letter);
        const correctStates = wordLetters.filter((v, i) => v === letter && v === inputLetters[i]);

        if (letterMatches.length > (prevContainStates.length + correctStates.length)) {
          triesStates[i].push(LETTER_STATE.CONTAIN);
          return
        }
      }
    
      triesStates[i].push(LETTER_STATE.DEFAULT);
    })
  });

  return triesStates;
}
