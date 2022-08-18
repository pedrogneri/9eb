export enum GAME_STATE {
  PLAYING,
  WIN,
  LOSE,
}

export enum LETTER_STATE {
  CORRECT, 
  CONTAIN,
  INCORRECT,
  DEFAULT,
}

export const BOARD_CONFIG = {
  WORD_LENGTH: 5,
  TRIES: 6,
}
