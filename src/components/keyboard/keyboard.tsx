import React from 'react'
import { Letter } from '../letter';
import { State } from '../letter/letter';
import * as S from './keyboard.style';

type Props = {
  word: string;
  tries: string[];
}

const entries = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const Keyboard = ({ word, tries }: Props) => {
  const getLetterState = (letter: string) => {
    let state: State = 'default';

    tries.forEach((input) => {
      if (state === 'correct') {
        return;
      }

      if (word.includes(letter) && input.includes(letter)) {
        state = 'contain';
      }

      input.split('').forEach((v, index) => {
        if (v === letter && v === word[index]) {
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
              <Letter
                value={letter}
                state={getLetterState(letter.toLowerCase())}
                isSelected={false}
              />
            </S.Row>
          ))}
        </S.Row>
      ))}
    </S.Container>
  )
}

export default Keyboard;
