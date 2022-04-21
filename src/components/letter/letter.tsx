import React from 'react'
import * as S from './letter.style';

export type State = 'correct' | 'contain' | 'default';

type Props = {
  value: string;
  isSelected: boolean;
  state?: State;
  className?: string;
}

const Letter = ({
  className, value, isSelected, state = 'default'
}: Props) => {
  return (
    <S.Container
      className={className}
      $state={state}
      $isSelected={isSelected}
    >
      {value.toUpperCase()}
    </S.Container>
  )
}

export default Letter;