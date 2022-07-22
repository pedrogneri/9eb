import React from 'react'
import { BOARD_CONFIG, LETTER_STATE } from '../../constants'
import * as S from './row.style';

type Props = {
  input: string[];
  rowState: LETTER_STATE[];
  isSelected: boolean;
  selectedLetter: number;
  onClickLetter: Function;
}

const Row = ({ input, isSelected, selectedLetter, onClickLetter, rowState }: Props) => {
  return (
    <S.Container>
      {[...Array(BOARD_CONFIG.WORD_LENGTH)].map((_, index) => (
        <S.StyledLetter
          key={index.toString()}
          value={input[index]} 
          isSelected={isSelected}
          state={rowState[index]}
          onClick={() => isSelected ? onClickLetter(index) : {}}
          isPressed={isSelected && index === selectedLetter}
        />
      ))}
    </S.Container>
  )
}

export default Row;
