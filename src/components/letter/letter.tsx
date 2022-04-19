import React from 'react'
import * as S from './letter.style';

type Props = {
  value: string;
  isSelected: boolean;
}

const Letter = ({ value, isSelected }: Props) => {
  return (
    <S.Container
      $isSelected={isSelected}
    >
      {value.toUpperCase()}
    </S.Container>
  )
}

export default Letter;