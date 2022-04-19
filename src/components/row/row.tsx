import React from 'react'
import { Letter } from '../letter';
import * as S from './row.style';

type Props = {
  value: string;
  isSelected: boolean;
}

const Row = ({ value, isSelected }: Props) => {
  return (
    <S.Container>
      {[...Array(5)].map((_, index) => (
        <Letter
          key={index.toString()}
          value={value[index] || ''} 
          isSelected={isSelected} 
        />
      ))}
    </S.Container>
  )
}

export default Row;
