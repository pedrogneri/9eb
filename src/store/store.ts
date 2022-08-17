import create from 'zustand'
import { persist } from 'zustand/middleware'
import crypto from 'crypto-js'

import { getRandomWord } from '../lib/words';
import { BOARD_CONFIG, GAME_STATE } from '../constants';
import { ACTIONS, Actions } from './actions';

export const EMPTY_WORD: string[] = Array(BOARD_CONFIG.WORD_LENGTH).fill('');
export const EMPTY_TRIES: string[][] = Array(BOARD_CONFIG.TRIES).fill(EMPTY_WORD);

export interface HistoryRegistry {
  word: string,
  tries: number,
  status: GAME_STATE,
}

export interface State extends Actions {
  word: string;
  input: string[],
  status: GAME_STATE,
  tries: string[][],
  rowIndex: number,
  history: HistoryRegistry[],
}

const PASSPHRASE = 'RNF2Xs5S9pP6H&!ti@Cs@G#KMn3V4Znj'

const encryptWithAES = (text: string) =>  crypto.AES.encrypt(text, PASSPHRASE).toString();
const decryptWithAES = (cipherText: string) => {
  const bytes = crypto.AES.decrypt(cipherText, PASSPHRASE);
  return bytes.toString(crypto.enc.Utf8);
};

export const useStore = create(
  persist<State>(
    (set) => ({
      status: GAME_STATE.PLAYING,
      word: getRandomWord([]),
      input: EMPTY_WORD,
      tries: EMPTY_TRIES,
      rowIndex: 0,
      history: [],
      ...ACTIONS(set)
    }), {
      name: 'store',
      serialize: (state) => encryptWithAES(JSON.stringify(state)),
      deserialize: (str) => JSON.parse(decryptWithAES(str)),
    }
  )
);
