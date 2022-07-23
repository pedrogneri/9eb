import create from 'zustand'
import { persist } from 'zustand/middleware'

import { getRandomWord } from '../lib/words';
import { BOARD_CONFIG, GAME_STATE } from '../constants';

const EMPTY_WORD: string[] = Array(BOARD_CONFIG.WORD_LENGTH).fill('');
const EMPTY_TRIES: string[][] = Array(BOARD_CONFIG.TRIES).fill(EMPTY_WORD);

type State = {
  word: string;
  input: string[],
  status: GAME_STATE,
  tries: string[][],
  rowIndex: number,
  inputValue: Function,
  deleteValue: Function,
  resetGame: Function;
  nextTry: Function;
}

export const useStore = create(
  persist<State>(
    (set) => ({
      status: GAME_STATE.PLAYING,
      word: getRandomWord(),
      input: EMPTY_WORD,
      tries: EMPTY_TRIES,
      rowIndex: 0,
      inputValue: (value: string, selectedLetter: number) => set((state) => {
        const newValue = [...state.input];
        newValue[selectedLetter] = value;

        return ({
          input: newValue,
        })
      }),
      deleteValue: (selectedLetter: number) => set((state) => {
        const newValue = [...state.input];
        const index = selectedLetter > -1 ? 
          selectedLetter - (newValue[selectedLetter] === '' ? 1 : 0) :
          BOARD_CONFIG.WORD_LENGTH - 1;

        newValue[index] = '';

        return { input: newValue };
      }),
      resetGame: () => set(() => ({
        status: GAME_STATE.PLAYING,
        word: getRandomWord(),
        tries: EMPTY_TRIES,
        rowIndex: 0,
      })),
      nextTry: (input: string) => set((state) => {
        let newState: Partial<State> = {};
        const isLastTry = state.rowIndex === BOARD_CONFIG.TRIES - 1;
        const isCorrect = input === state.word;

        if (isCorrect) {
          newState.status = GAME_STATE.WIN;
        } else if (isLastTry) {
          newState.status = GAME_STATE.LOSE;
        } else {
          newState.rowIndex = state.rowIndex + 1;
        }

        const newTries = [...state.tries];
        const index = newTries.findIndex(v => v.every(v => v === ''));
        newTries[index] = input.split('');
        newState.tries = newTries;
        newState.input = EMPTY_WORD;

        return newState;
      }),
    }), {
      name: 'store',
    }
  )
);
