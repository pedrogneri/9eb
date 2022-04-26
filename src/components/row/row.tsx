import React from 'react'
import { normalizeWord } from '../../lib/words';
import { State } from '../letter/letter';
import * as S from './row.style';

type Props = {
  word: string;
  input: string[];
  isSelected: boolean;
  filled?: boolean;
}

const Row = ({ word, input, isSelected, filled = false }: Props) => {
  const getLetterState = (index: number): State => {
    const wordLetters = normalizeWord(word).split('');
    const inputLetters = normalizeWord(input.join()).split('');

    const wordChar = wordLetters[index];
    const inputChar = inputLetters[index];

    if (isSelected && !filled) {
      return 'default'
    }

    if (wordChar === inputChar) {
      return 'correct';
    }

    if (wordLetters.includes(inputChar)) {
      let previousRepeat = 0;

      const inputMatches = inputLetters.filter((v, i) => {
        if (v === inputChar && i < index) {
          previousRepeat += 1;
        }
        return v === inputChar
      });

      if(inputMatches.length > 1) {
        const correctPositions = wordLetters.filter(
          (v, i) => v === inputLetters[i] && v === inputChar
        );
        const wordMatches = wordLetters.filter((v) => v === inputChar);

        if (
          (correctPositions.length < inputMatches.length && inputMatches.length < wordMatches.length) ||
          (previousRepeat >= wordMatches.length)
        ) {
          return 'default';
        }
      }

      return 'contain';
    }

    return 'default'
  }

  return (
    <S.Container>
      {[...Array(5)].map((_, index) => (
        <S.StyledLetter
          key={index.toString()}
          value={input[index]} 
          isSelected={isSelected}
          state={getLetterState(index)}
          isPressed={isSelected}
        />
      ))}
    </S.Container>
  )
}

export default Row;
