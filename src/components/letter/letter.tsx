import React from 'react'
import { LETTER_STATE } from '../../constants';
import * as S from './letter.style';

type Props = {
  value: string;
  isSelected: boolean;
  state?: LETTER_STATE;
  className?: string;
  isPressed?: boolean;
  incorrect?: boolean;
  onClick: Function;
}

const Letter = ({
  className, value, isSelected, isPressed = false, incorrect, state = LETTER_STATE.DEFAULT, onClick
}: Props) => {
  return (
    <S.Container
      className={className}
      $state={state}
      $isSelected={isSelected}
      $isPressed={isPressed}
      $incorrect={incorrect}
      onClick={() => onClick()}
    >
      {value.toUpperCase()}
    </S.Container>
  )
}

export default Letter;
