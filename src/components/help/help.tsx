import { Grid } from '@mui/material';
import React from 'react'
import { Modal } from '../modal';
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
  return (
    <Modal show={!!show} onClose={() => onClose()}>
      <Grid container item gap={2}>
        <Grid container item justifyContent={"center"}>
          <S.Title>Como jogar</S.Title>
        </Grid>

        <Grid container item gap={1}>
          <S.Description>
            <b>Objetivo:</b> Adivinhar a palavra em até 6 tentativas
          </S.Description>
          <S.Divisor />
          <S.Description>
            Após cada tentativa as letras mudarão de cor para te dar dicas sobre a resposta:
          </S.Description>
        </Grid>

        <Grid container item gap={1}>
          {COLORS_ENTRIES.map(({ color, colorName, text, letter }, index) => (
            <S.ColorTutorial key={index.toString()}>
              <S.Color $color={color}>{letter}</S.Color>
              <S.ColorText><b>{colorName}:</b> {text}</S.ColorText>
            </S.ColorTutorial>
          ))}
        </Grid>
      </Grid>
    </Modal>
  );
}

export default Help;