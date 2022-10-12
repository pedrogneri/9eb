import { BOARD_CONFIG, GAME_STATE } from "../constants";
import { getRandomWord, normalizeWord } from "../lib/words";
import { Actions, EMPTY_TRIES, EMPTY_WORD, State, Store } from "./interfaces";

type Setter = (
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined
) => void;

export const resetGame = (state: Store) => {
  const newHistory = [
    ...state.history,
    {
      word: state.word,
      status: state.status,
      tries: state.rowIndex + 1,
    },
  ];

  return {
    status: GAME_STATE.PLAYING,
    word: getRandomWord(newHistory),
    tries: EMPTY_TRIES,
    rowIndex: 0,
    history: newHistory,
  };
};

export const nextTry = (state: Store, input: string) => {
  let newState: Partial<State> = {};
  const isLastTry = state.rowIndex === BOARD_CONFIG.TRIES - 1;
  const isCorrect = normalizeWord(input) === normalizeWord(state.word);

  if (isCorrect) {
    newState.status = GAME_STATE.WIN;
  } else if (isLastTry) {
    newState.status = GAME_STATE.LOSE;
  } else {
    newState.rowIndex = state.rowIndex + 1;
  }

  const newTries = [...state.tries];
  const index = newTries.findIndex((v) => v.every((v) => v === ""));
  newTries[index] = input.split("");
  newState.tries = newTries;
  newState.input = EMPTY_WORD;

  return newState;
};

export const inputValue = (
  state: Store,
  value: string,
  selectedLetter: number
) => {
  const newValue = [...state.input];
  newValue[selectedLetter] = value;

  return {
    input: newValue,
  };
};

export const deleteValue = (state: Store, selectedLetter: number) => {
  const newValue = [...state.input];
  const index =
    selectedLetter > -1
      ? selectedLetter - (newValue[selectedLetter] === "" ? 1 : 0)
      : BOARD_CONFIG.WORD_LENGTH - 1;

  newValue[index] = "";

  return { input: newValue };
};

export const ACTIONS = (set: Setter): Actions => ({
  resetGame: () => set((state) => resetGame(state)),
  nextTry: (input: string) => set((state) => nextTry(state, input)),
  inputValue: (value: string, selectedLetter: number) =>
    set((state) => inputValue(state, value, selectedLetter)),
  deleteValue: (selectedLetter: number) =>
    set((state) => deleteValue(state, selectedLetter)),
});
