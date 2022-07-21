import React from 'react'
import { normalizeWord } from '../../lib/words';
import { BOARD_CONFIG, LETTER_STATE } from '../../constants'
import * as S from './row.style';

type Props = {
  word: string;
  input: string[];
  isSelected: boolean;
  selectedLetter: number;
  onClickLetter?: Function;
  filled?: boolean;
}

const Row = ({ word, input, isSelected, selectedLetter, onClickLetter, filled = false }: Props) => {
  const getLetterState = (index: number): LETTER_STATE => {
    const wordLetters = normalizeWord(word).split('');
    const inputLetters = normalizeWord(input.join('')).split('');

    const wordChar = wordLetters[index];
    const inputChar = inputLetters[index];

    if (isSelected && !filled) {
      return LETTER_STATE.DEFAULT;
    }

    if (wordChar === inputChar) {
      return LETTER_STATE.CORRECT;
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
          return LETTER_STATE.DEFAULT;
        }
      }

      return LETTER_STATE.CONTAIN;
    }

    return LETTER_STATE.DEFAULT;
  }

  return (
    <S.Container>
      {[...Array(BOARD_CONFIG.WORD_LENGTH)].map((_, index) => (
        <S.StyledLetter
          key={index.toString()}
          value={input[index]} 
          isSelected={isSelected}
          state={getLetterState(index)}
          onClick={() => onClickLetter ? onClickLetter(index) : {}}
          isPressed={isSelected && index === selectedLetter}
        />
      ))}
    </S.Container>
  )
}

export default Row;
