import { WORDS } from "./entries"

const wordsArray = WORDS.split(',');

const getRandomIndex = (min: number, max: number) => Math.trunc(Math.random() * (max - min) + min);

export const findWord = (value: string) => wordsArray.find(v => normalizeWord(v) === value);

export const normalizeWord = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

export const getRandomWord = () => wordsArray[getRandomIndex(0, wordsArray.length - 1)];
