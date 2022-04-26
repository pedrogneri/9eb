import React from 'react'
import * as S from './letter.style';

export type State = 'correct' | 'contain' | 'incorrect' | 'default';

type Props = {
  value: string;
  isSelected: boolean;
  state?: State;
  className?: string;
  isPressed?: boolean;
  onClick: Function;
}

const Letter = ({
  className, value, isSelected, isPressed = false, state = 'default', onClick
}: Props) => {
  return (
    <S.Container
      className={className}
      $state={state}
      $isSelected={isSelected}
      $isPressed={isPressed}
      onClick={() => onClick()}
    >
      {value.toUpperCase()}
    </S.Container>
  )
}

export default Letter;