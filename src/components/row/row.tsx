import React from 'react'
import { normalizeWord } from '../../lib/words';
import { Letter } from '../letter';
import { State } from '../letter/letter';
import * as S from './row.style';

type Props = {
  word: string;
  value: string;
  isSelected: boolean;
}

const Row = ({ word, value, isSelected }: Props) => {
  const getLetterState = (index: number): State => {
    const normalizedWord = normalizeWord(word);
    const normalizedValue = normalizeWord(value);

    if (isSelected) {
      return 'default'
    }

    if (normalizedValue[index] === normalizedWord[index]) {
      return 'correct';
    }

    if (normalizedWord.includes(normalizedValue[index])) {
      return 'contain';
    }

    return 'default'
  }

  return (
    <S.Container>
      {[...Array(5)].map((_, index) => (
        <Letter
          key={index.toString()}
          value={value[index] || ''} 
          isSelected={isSelected}
          state={getLetterState(index)}
        />
      ))}
    </S.Container>
  )
}

export default Row;
