import React from 'react'
import * as S from './help.style';

type Props = {
  show?: boolean;
}

const Help = ({
  show,
}: Props) => {
  return show ? (
    <S.Container>
      <S.Title>COMO JOGAR</S.Title>
      <S.Description>VOCÊ TERA 6 TENTATIVAS PARA ADIVINHAR A PALAVRA APÓS CADA TENTATIVA AS LETRAS MUDARÃO DE COR PARA INDICAR O QUÃO PERTO DA RESPOSTA VOCÊ ESTÁ.</S.Description>
    </S.Container>
  ) : <></>;
}

export default Help;