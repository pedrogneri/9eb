import React from 'react'
import * as S from './letter.style';

export type State = 'correct' | 'contain' | 'default';

type Props = {
  value: string;
  isSelected: boolean;
  state?: State;
}

const Letter = ({
  value, isSelected, state = 'default'
}: Props) => {
  return (
    <S.Container
      $state={state}
      $isSelected={isSelected}
    >
      {value.toUpperCase()}
    </S.Container>
  )
}

export default Letter;