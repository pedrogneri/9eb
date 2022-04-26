import React from 'react'
import { normalizeWord } from '../../lib/words';
import { State } from '../letter/letter';
import * as S from './keyboard.style';

type Props = {
  word: string;
  tries: string[][];
  onChange: Function;
  onConfirm: Function;
  onDelete: Function;
}

const entries = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const Keyboard = ({
  word,
  tries,
  onChange,
  onConfirm,
  onDelete,
}: Props) => {
  const getLetterState = (letter: string) => {
    let state: State = 'default';
    const normalizedWord = normalizeWord(word);

    tries.forEach((input) => {
      const normalizedInput = normalizeWord(input.join(''));

      if (state === 'correct') {
        return;
      }

      if (normalizedInput.includes(letter)) {
        if (normalizedWord.includes(letter)) {
          state = 'contain';
        } else {
          state = 'incorrect';
        }
      }

      normalizedInput.split('').forEach((v, index) => {
        if (v === letter && v === normalizedWord[index]) {
          state = 'correct'
        }
      });
    })

    return state;
  }

  return (
    <S.Container>
      {entries.map((letters, index) => (
        <S.Row key={index.toString()}>
          {letters.map((letter) => (
            <S.Key
              key={letter}
              onClick={() => onChange(letter)}
              value={letter.toUpperCase()}
              state={getLetterState(letter)}
              isSelected={false}
            />
          ))}
        </S.Row>
      ))}
      <S.Row>
        <S.SpecialKey onClick={() => onDelete()}>
          <S.Delete /> 
        </S.SpecialKey>
        <S.SpecialKey onClick={() => onConfirm()}>
          <S.Like />
        </S.SpecialKey>
      </S.Row>
    </S.Container>
  )
}

export default Keyboard;
