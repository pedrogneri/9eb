import React from 'react'
import * as S from './letter.style';

type Props = {
  value: string;
}

const Letter = ({ value }: Props) => {
  return <S.Container>{value.toUpperCase()}</S.Container>
}

export default Letter;