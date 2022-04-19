import React from 'react'
import { Letter } from '../letter';
import * as S from './row.style';

const Row = () => {
  return (
    <S.Container>
      {[...Array(5)].map(() => (
        <Letter />
      ))}
    </S.Container>
  )
}

export default Row;