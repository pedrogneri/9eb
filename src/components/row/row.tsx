import React from 'react'
import { Grid } from '@mui/material';
import { BOARD_CONFIG, LETTER_STATE } from '../../constants'

import * as S from './row.style';

type Props = {
  input: string[];
  rowState: LETTER_STATE[];
  isSelected: boolean;
  selectedLetter: number;
  incorrect: boolean;
  onClickLetter: Function;
}

const Row = ({ input, incorrect, isSelected, selectedLetter, onClickLetter, rowState }: Props) => {
  return (
    <Grid
      container
      item
      justifyContent={"center"}
      columns={5}
    >
      {[...Array(BOARD_CONFIG.WORD_LENGTH)].map((_, index) => (
        <Grid key={index.toString()} item padding={0.5}>
          <S.StyledLetter
            incorrect={incorrect}
            value={input[index]} 
            isSelected={isSelected}
            state={rowState[index]}
            onClick={() => isSelected ? onClickLetter(index) : {}}
            isPressed={isSelected && index === selectedLetter}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Row;
