import { BOARD_CONFIG, GAME_STATE } from "../constants";
import { getRandomWord } from "../lib/words";
import { EMPTY_TRIES, EMPTY_WORD, State } from "./store"

type Setter = (partial: State | Partial<State> | ((state: State) => State | Partial<State>), replace?: boolean | undefined) => void;

export interface Actions {
  inputValue: Function,
  deleteValue: Function,
  resetGame: Function;
  nextTry: Function;
}

export const ACTIONS = (set: Setter) => {
  const resetGame = () => (
    set((): Partial<State> => ({
      status: GAME_STATE.PLAYING,
      word: getRandomWord(),
      tries: EMPTY_TRIES,
      rowIndex: 0,
    }))
  );
  
  const nextTry = (input: string) => (
    set((state) => {
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
    })
  );
  
  const inputValue = (value: string, selectedLetter: number) => (
    set((state) => {
      const newValue = [...state.input];
      newValue[selectedLetter] = value;
  
      return ({
        input: newValue,
      })
    })
  );
  
  const deleteValue = (selectedLetter: number) => (
    set((state) => {
      const newValue = [...state.input];
      const index = selectedLetter > -1 ? 
        selectedLetter - (newValue[selectedLetter] === '' ? 1 : 0) :
        BOARD_CONFIG.WORD_LENGTH - 1;
  
      newValue[index] = '';
  
      return { input: newValue };
    })
  );

  return {
    resetGame,
    nextTry,
    inputValue,
    deleteValue,
  }
};
