import create from 'zustand'
import { persist } from 'zustand/middleware'

import { getRandomWord } from '../lib/words';
import { BOARD_CONFIG, GAME_STATE } from '../constants';

const EMPTY_WORD: string[] = Array(BOARD_CONFIG.WORD_LENGTH).fill('');
const EMPTY_TRIES: string[][] = Array(BOARD_CONFIG.TRIES).fill(EMPTY_WORD);

type State = {
  word: string;
  status: GAME_STATE,
  tries: string[][],
  rowIndex: number,
  updateRowIndex: Function;
  setTries: Function;
  setStatus: Function,
  resetGame: Function;
}

export const useStore = create(
  persist<State>(
    (set) => ({
      word: getRandomWord(),
      status: GAME_STATE.PLAYING,
      tries: EMPTY_TRIES,
      rowIndex: 0,
      updateRowIndex: () => set((state) => ({ rowIndex: state.status !== GAME_STATE.PLAYING ? state.rowIndex : state.rowIndex + 1 })),
      setTries: (newValue: string[][]) => set(() => ({ tries: newValue })),
      setStatus: (newValue: GAME_STATE) => set(() => ({ status: newValue })),
      resetGame: () => set(() => ({
          status: GAME_STATE.PLAYING,
          word: getRandomWord(),
          tries: EMPTY_TRIES,
          rowIndex: 0,
        }))
    }), {
      name: 'store',
    }
  )
);
