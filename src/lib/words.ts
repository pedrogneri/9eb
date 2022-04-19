import { WORDS } from "./entries"

const wordsArray = WORDS.split(',');

export const findWord = (value: string) => wordsArray.find(v => normalizeWord(v) === value);

export const normalizeWord = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
