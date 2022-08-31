import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { GAME_STATE } from '../../constants';
import { Modal } from '../modal';
import * as S from './endGameModal.style';

type Props = {
  onClose: Function;
  gameState: GAME_STATE;
  correctWord: string;
}

const EndGameModal = ({ gameState, onClose, correctWord }: Props) => {
  const [status, setStatus] = useState<GAME_STATE>();
  const [word, setWord] = useState<string>()

  useEffect(() => {
    if (gameState !== GAME_STATE.PLAYING) {
      setStatus(gameState);
      setWord(correctWord)
    }
  }, [gameState, correctWord])

  return (
    <Modal
      show={gameState !== GAME_STATE.PLAYING}
      onClose={() => onClose()}
    >
      <Grid
        item
        container
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <S.Title>{status === GAME_STATE.WIN ? 'Você ganhou' : 'Você perdeu'}</S.Title>
        RESPOSTA CERTA:
        <S.CorrectWord $gameState={status}>{word}</S.CorrectWord>
      </Grid>
    </Modal>
  )
}

export default EndGameModal;
