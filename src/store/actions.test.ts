import { GAME_STATE } from "../constants";
import * as Actions from "./actions";
import * as Words from "../lib/words";
import { EMPTY_TRIES, EMPTY_WORD, Store } from "./interfaces";

const word = "amora";
const wrongWord = "arara";

describe("store/actions", () => {
  const spyGetRandomWord = jest.spyOn(Words, "getRandomWord");

  describe("resetGame()", () => {
    const tries = [...EMPTY_TRIES];
    tries[0] = wrongWord.split("");
    tries[1] = word.split("");
    const gameStoreMock: Store = {
      status: GAME_STATE.WIN,
      word,
      tries,
      rowIndex: 1,
      history: [],
      input: [],
    };

    it("should reset store", () => {
      spyGetRandomWord.mockReturnValue(wrongWord);
      const result = Actions.resetGame(gameStoreMock);

      const newStore = {
        status: GAME_STATE.PLAYING,
        word: wrongWord,
        tries: EMPTY_TRIES,
        rowIndex: 0,
        history: [
          {
            word,
            status: GAME_STATE.WIN,
            tries: 2,
          },
        ],
      };

      expect(result).toStrictEqual(newStore);
    });
  });

  describe("nextTry()", () => {
    it("should set game state as win if input is correct", () => {
      const storeMock: Store = {
        status: GAME_STATE.PLAYING,
        input: word.split(""),
        word,
        tries: EMPTY_TRIES,
        rowIndex: 0,
        history: [],
      };
      const result = Actions.nextTry(storeMock, word);

      const newStore = {
        status: GAME_STATE.WIN,
        input: EMPTY_WORD,
        tries: [word.split(""), ...EMPTY_TRIES.slice(1)],
      };

      expect(result).toStrictEqual(newStore);
    });

    it("should set game state as lose if was the last try and input is incorrect", () => {
      const tries = Array(5).fill(wrongWord.split(""));
      const storeMock: Store = {
        status: GAME_STATE.PLAYING,
        input: wrongWord.split(""),
        word,
        tries: [...tries, EMPTY_WORD],
        rowIndex: 5,
        history: [],
      };
      const result = Actions.nextTry(storeMock, wrongWord);

      const newStore = {
        status: GAME_STATE.LOSE,
        input: EMPTY_WORD,
        tries: [...tries, wrongWord.split("")],
      };

      expect(result).toStrictEqual(newStore);
    });

    it("should advance to next row", () => {
      const storeMock: Store = {
        status: GAME_STATE.PLAYING,
        input: wrongWord.split(""),
        word,
        tries: EMPTY_TRIES,
        rowIndex: 0,
        history: [],
      };
      const result = Actions.nextTry(storeMock, wrongWord);

      const newStore = {
        input: EMPTY_WORD,
        rowIndex: 1,
        tries: [wrongWord.split(""), ...EMPTY_TRIES.slice(1)],
      };

      expect(result).toStrictEqual(newStore);
    });
  });

  describe("inputValue()", () => {
    it("should input letter in the selected letter index", () => {
      const storeMock: Store = {
        status: GAME_STATE.PLAYING,
        word,
        input: EMPTY_WORD,
        tries: EMPTY_TRIES,
        rowIndex: 0,
        history: [],
      };
      const result = Actions.inputValue(storeMock, "a", 1);

      const newStore = {
        input: ["", "a", ...EMPTY_WORD.slice(2)],
      };

      expect(result).toStrictEqual(newStore);
    });
  });

  describe("deleteValue()", () => {
    it("should delete previous value from selected letter if the value was valid", () => {
      const storeMock: Store = {
        status: GAME_STATE.PLAYING,
        word,
        input: ["a", "m", ...EMPTY_WORD.slice(2)],
        tries: EMPTY_TRIES,
        rowIndex: 0,
        history: [],
      };
      const result = Actions.deleteValue(storeMock, 1);

      const newStore = {
        input: ["a", ...EMPTY_WORD.slice(1)],
      };

      expect(result).toStrictEqual(newStore);
    });

    it("should delete last value if selected letter was -1", () => {
      const storeMock: Store = {
        status: GAME_STATE.PLAYING,
        word,
        input: word.split(""),
        tries: EMPTY_TRIES,
        rowIndex: 0,
        history: [],
      };
      const result = Actions.deleteValue(storeMock, -1);

      const newStore = {
        input: [...word.split("").slice(0, 4), ""],
      };

      expect(result).toStrictEqual(newStore);
    });
  });
});

export {};
