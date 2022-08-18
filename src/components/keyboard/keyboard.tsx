import React from 'react'
import { Grid } from '@mui/material';

import { normalizeWord } from '../../lib/words';
import { LETTER_STATE } from '../../constants';
import { useStore } from '../../store';

import * as S from './keyboard.style';

type Props = {
  onChange: Function;
  onConfirm: Function;
  onDelete: Function;
}

const entries = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const Keyboard = ({
  onChange,
  onConfirm,
  onDelete,
}: Props) => {
  const {
    tries,
    word,
  } = useStore((state) => state);

  const getLetterState = (letter: string) => {
    let state: LETTER_STATE = LETTER_STATE.DEFAULT;
    const normalizedWord = normalizeWord(word);

    tries.forEach((input) => {
      const normalizedInput = normalizeWord(input.join(''));

      if (state === LETTER_STATE.CORRECT) {
        return;
      }

      if (normalizedInput.includes(letter)) {
        if (normalizedWord.includes(letter)) {
          state = LETTER_STATE.CONTAIN;
        } else {
          state = LETTER_STATE.INCORRECT;
        }
      }

      normalizedInput.split('').forEach((v, index) => {
        if (v === letter && v === normalizedWord[index]) {
          state = LETTER_STATE.CORRECT
        }
      });
    })

    return state;
  }

  return (
    <S.Container>
      <Grid container md={8} xs={12} spacing={0.5} >
        {entries.map((letters, index) => (
          <Grid key={index.toString()} container item xs={12} justifyContent={"center"} spacing={0.5}>
            {letters.map((letter) => (
              <Grid item xs={1.2}>
                <S.Key
                  key={letter}
                  onClick={() => onChange(letter)}
                  value={letter.toUpperCase()}
                  state={getLetterState(letter)}
                  isSelected={false}
                />
              </Grid>
            ))}
          </Grid>
        ))}

        <Grid container item xs={12} spacing={0.5} justifyContent={"center"}>
          <Grid item xs={3} justifyContent="center">
            <S.SpecialKey onClick={() => onDelete()}>
              <S.Delete /> 
            </S.SpecialKey>
          </Grid>
          <Grid item xs={3} justifyContent="center">
            <S.SpecialKey onClick={() => onConfirm()}>
              <S.Like />
            </S.SpecialKey>
          </Grid>
        </Grid>
      </Grid>
    </S.Container>
  )
}

export default Keyboard;
