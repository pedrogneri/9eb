import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import * as S from './help.style';

type Props = {
  show?: boolean;
  onClose: Function;
}

const Help = ({
  show, onClose,
}: Props) => {
  return show ? (
    <>
      <Backdrop open={show} onClick={() => onClose()} />
      <S.Container>
        <S.Title>Como jogar</S.Title>
        <S.Description>Você tera 6 tentativas para adivinhar a palavra após cada tentativa as letras mudarão de cor para indicar o quão perto da resposta você está.</S.Description>

        <S.ColorTutorial>
          <S.Color $color="#99eebb" />
          <S.ColorText>Verde - a letra está na palavra e na posição correta</S.ColorText>
        </S.ColorTutorial>

        <S.ColorTutorial>
          <S.Color $color="#e9eb87" />
          <S.ColorText>Amarelo - a letra está na palavra, mas na posição errada</S.ColorText>
        </S.ColorTutorial>

        <S.ColorTutorial>
          <S.Color $color="#eee" />
          <S.ColorText>Branco - a letra não se encontra na palavra</S.ColorText>
        </S.ColorTutorial>
      </S.Container>
    </>
  ) : <></>;
}

export default Help;