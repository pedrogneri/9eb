import create from 'zustand'
import { persist } from 'zustand/middleware'

import { getRandomWord } from '../lib/words';
import { BOARD_CONFIG, GAME_STATE } from '../constants';
import { ACTIONS, Actions } from './actions';

export const EMPTY_WORD: string[] = Array(BOARD_CONFIG.WORD_LENGTH).fill('');
export const EMPTY_TRIES: string[][] = Array(BOARD_CONFIG.TRIES).fill(EMPTY_WORD);

export interface State extends Actions {
  word: string;
  input: string[],
  status: GAME_STATE,
  tries: string[][],
  rowIndex: number,
}

export const useStore = create(
  persist<State>(
    (set) => ({
      status: GAME_STATE.PLAYING,
      word: getRandomWord(),
      input: EMPTY_WORD,
      tries: EMPTY_TRIES,
      rowIndex: 0,
      ...ACTIONS(set)
    }), {
      name: 'store',
    }
  )
);
