import create from "zustand";
import { persist } from "zustand/middleware";
import crypto from "crypto-js";
import { getRandomWord } from "../lib/words";
import { GAME_STATE } from "../constants";
import { ACTIONS } from "./actions";
import { EMPTY_TRIES, EMPTY_WORD, State } from "./interfaces";

const PASSPHRASE = process.env.REACT_APP_PASSPHRASE;
const IS_DEBUG_MODE = process.env.REACT_APP_DEBUG === "true";

const encrypt = (text: string) => {
  if (!PASSPHRASE) {
    return text;
  }
  return crypto.AES.encrypt(text, PASSPHRASE).toString();
};

const decrypt = (cipherText: string) => {
  if (!PASSPHRASE) {
    return cipherText;
  }
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
      ...ACTIONS(set),
    }),
    {
      name: "store",
      serialize: (state) => encrypt(JSON.stringify(state)),
      deserialize: (str) => {
        const value = JSON.parse(decrypt(str));
        if (IS_DEBUG_MODE) {
          console.log(value);
        }
        return value;
      },
    }
  )
);
