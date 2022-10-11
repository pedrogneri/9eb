import { HistoryRegistry } from "../store";
import words from "../data/words.json";
import { LETTER_STATE } from "../constants";

export const { list, whitelist } = words;

export const getRandomIndex = (min: number, max: number) =>
  Math.trunc(Math.random() * (max - min) + min);

export const findWord = (value: string) =>
  list.find((v) => normalizeWord(v) === value);

export const normalizeWord = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const getRandomWord = (history: HistoryRegistry[]): string => {
  const randomWord = whitelist[getRandomIndex(0, whitelist.length - 1)];
  const isValidWord = list.find((v) => v === randomWord);
  const alreadyPlayedWord = history.some(({ word }) => word === randomWord);

  if (isValidWord && !alreadyPlayedWord) {
    return randomWord;
  }

  return getRandomWord(history);
};

export const getWordStates = (row: string[], solution: string) => {
  const states: LETTER_STATE[] = [];
  const solutionLetters = normalizeWord(solution).split("");
  const inputLetters = normalizeWord(row.join("")).split("");

  inputLetters.forEach((letter, index) => {
    const correctPosition = solutionLetters[index] === letter;

    if (correctPosition) {
      states.push(LETTER_STATE.CORRECT);
      return;
    }

    if (solutionLetters.includes(letter)) {
      const letterMatches = solutionLetters.filter((v) => v === letter);
      const previousContainStates = states.filter(
        (v, i) => v === LETTER_STATE.CONTAIN && row[i] === letter
      );
      const correctStates = solutionLetters.filter(
        (v, i) => v === letter && v === inputLetters[i]
      );
      const nonDefaultLetters = [...previousContainStates, ...correctStates];

      if (letterMatches.length > nonDefaultLetters.length) {
        states.push(LETTER_STATE.CONTAIN);
        return;
      }
    }
    states.push(LETTER_STATE.DEFAULT);
  });
  return states;
};

export const getTriesStates = (tries: string[][], solution: string) =>
  tries.map((row) => getWordStates(row, solution));
