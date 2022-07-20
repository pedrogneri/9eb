import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import * as S from './help.style';

type Props = {
  show?: boolean;
  onClose: Function;
}

const COLORS_ENTRIES = [
  {
    color: '#99eebb',
    colorName: 'Verde',
    text: 'a letra está na palavra e na posição correta',
    letter: 'A',
  },
  {
    color: '#e9eb87',
    colorName: 'Amarelo',
    text: 'a letra está na palavra, mas na posição errada',
    letter: 'B',
  },
  {
    color: '#eee',
    colorName: 'Branco',
    text: 'a letra não se encontra na palavra',
    letter: 'C',
  },
];

const Help = ({
  show, onClose,
}: Props) => {
  return show ? (
    <S.Container>
      <Backdrop open={show} onClick={() => onClose()} />
      <S.Modal>
        <S.CloseButton onClick={() => onClose()}>x</S.CloseButton>
        <S.Title>Como jogar</S.Title>

        <S.Description>
          <b>Objetivo:</b> Adivinhar a palavra em até 6 tentativas
          <br />
          Após cada tentativa as letras mudarão de cor para te dar dicas sobre a resposta:
        </S.Description>

        {COLORS_ENTRIES.map(({ color, colorName, text, letter }, index) => (
          <S.ColorTutorial key={`${index}`}>
            <S.Color $color={color}>{letter}</S.Color>
            <S.ColorText><b>{colorName}:</b> {text}</S.ColorText>
          </S.ColorTutorial>
        ))}
      </S.Modal>
    </S.Container>
  ) : <></>;
}

export default Help;