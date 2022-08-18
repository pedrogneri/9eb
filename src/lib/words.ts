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

const getWordStates = (row: string[], solution: string) => {
  const states: LETTER_STATE[] = []
  const solutionLetters = normalizeWord(solution).split('');
  const inputLetters = normalizeWord(row.join('')).split('');

  inputLetters.forEach((letter, index) => {
    const correctPosition = solutionLetters[index] === letter;

    if (correctPosition) {
      states.push(LETTER_STATE.CORRECT);
      return
    }
  
    if (solutionLetters.includes(letter)) {
      const letterMatches = solutionLetters.filter((v) => v === letter)
      const previousContainStates = states.filter((v, i) => v === LETTER_STATE.CONTAIN && row[i] === letter);
      const correctStates = solutionLetters.filter((v, i) => v === letter && v === inputLetters[i]);
      const nonDefaultLetters = [...previousContainStates, ...correctStates];

      if (letterMatches.length > nonDefaultLetters.length) {
        states.push(LETTER_STATE.CONTAIN);
        return
      }
    }
    states.push(LETTER_STATE.DEFAULT);
  })

  return states;
}

export const getTriesStates = (tries: string[][], solution: string) => tries.map((row) => getWordStates(row, solution))
