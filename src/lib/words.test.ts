import { GAME_STATE, LETTER_STATE } from "../constants";
import * as Words from "./words";

describe("lib/words", () => {
  describe("findWord()", () => {
    it("should return if the word was in the whitelist", () => {
      const word = "amora";
      const result = Words.findWord(word);
      expect(result).toBe(word);
    });

    it("shouldn't return if wasn't a valid word", () => {
      const word = "cebola";
      const result = Words.findWord(word);
      expect(result).toBe(undefined);
    });
  });

  describe("normalizeWord()", () => {
    it("should return normalized word", () => {
      const word = "alçapão";
      const result = Words.normalizeWord(word);
      expect(result).toBe("alcapao");
    });
  });

  describe("getRandomWord()", () => {
    const spyGetRandomIndex = jest.spyOn(Words, "getRandomIndex");

    it("shouldn't return word if was already played", () => {
      const word = Words.whitelist[0];
      const history = [
        {
          word,
          tries: 1,
          status: GAME_STATE.WIN,
        },
      ];
      spyGetRandomIndex.mockReturnValueOnce(0);

      const result = Words.getRandomWord(history);

      expect(result).not.toBe(word);
    });
  });

  describe("getWordStates()", () => {
    it("should return all states as correct if the word is equal the solution", () => {
      const word = "amora";
      const expected = Array(5).fill(LETTER_STATE.CORRECT);
      const result = Words.getWordStates(word.split(""), word);
      expect(result).toStrictEqual(expected);
    });

    it("should set as contain state if the letter was in the solution but in the wrong place", () => {
      const input = "outra";
      const solution = "amora";
      const expected = [
        LETTER_STATE.CONTAIN,
        LETTER_STATE.DEFAULT,
        LETTER_STATE.DEFAULT,
        LETTER_STATE.CORRECT,
        LETTER_STATE.CORRECT,
      ];
      const result = Words.getWordStates(input.split(""), solution);
      expect(result).toStrictEqual(expected);
    });

    it("shouldn't set as contain state if the letter are already set as correct", () => {
      const input = "arara";
      const solution = "amora";
      const expected = [
        LETTER_STATE.CORRECT,
        LETTER_STATE.DEFAULT,
        LETTER_STATE.DEFAULT,
        LETTER_STATE.CORRECT,
        LETTER_STATE.CORRECT,
      ];
      const result = Words.getWordStates(input.split(""), solution);
      expect(result).toStrictEqual(expected);
    });

    it("shouldn't set as contain state if the amount of non default letters already equal to number of matches", () => {
      const input = "banda";
      const solution = "antes";
      const expected = [
        LETTER_STATE.DEFAULT,
        LETTER_STATE.CONTAIN,
        LETTER_STATE.CONTAIN,
        LETTER_STATE.DEFAULT,
        LETTER_STATE.DEFAULT,
      ];
      const result = Words.getWordStates(input.split(""), solution);
      expect(result).toStrictEqual(expected);
    });
  });
});

export {};
