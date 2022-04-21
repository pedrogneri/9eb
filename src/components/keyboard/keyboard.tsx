import React from 'react'
import { normalizeWord } from '../../lib/words';
import { State } from '../letter/letter';
import * as S from './keyboard.style';

type Props = {
  word: string;
  tries: string[];
  onChange: Function;
  onConfirm: Function;
  onDelete: Function;
}

const entries = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
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
      const normalizedInput = normalizeWord(input);

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
      {entries.map((letters) => (
        <S.Row>
          {letters.map((letter) => (
            <S.Row>
              <div onClick={() => onChange(letter.toLowerCase())}>
                <S.Key
                  value={letter}
                  state={getLetterState(letter.toLowerCase())}
                  isSelected={false}
                />
              </div>
            </S.Row>
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
