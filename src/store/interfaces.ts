import { BOARD_CONFIG, GAME_STATE } from "../constants";

export const EMPTY_WORD: string[] = Array(BOARD_CONFIG.WORD_LENGTH).fill("");
export const EMPTY_TRIES: string[][] = Array(BOARD_CONFIG.TRIES).fill(
  EMPTY_WORD
);

export interface HistoryRegistry {
  word: string;
  tries: number;
  status: GAME_STATE;
}

export interface Store {
  word: string;
  input: string[];
  status: GAME_STATE;
  tries: string[][];
  rowIndex: number;
  history: HistoryRegistry[];
}

export interface Actions {
  inputValue: Function;
  deleteValue: Function;
  resetGame: Function;
  nextTry: Function;
}

export interface State extends Actions, Store {}
