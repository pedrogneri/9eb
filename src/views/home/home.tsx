import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Grid } from '@mui/material';
import { useStore } from '../../store';

import { Row, Keyboard, Header, EndGameModal } from '../../components';
import { findWord, getTriesStates } from '../../lib/words';
import { BOARD_CONFIG, GAME_STATE } from '../../constants';

import * as S from './home.style';

const Home = () => {
  const [selectedLetter, setSelectedLetter] = useState(0);

  const {
    rowIndex,
    input,
    tries,
    status,
    word,
  } = useStore((state) => state);

  const {
    inputValue,
    deleteValue,
    resetGame,
    nextTry,
  } = useStore((state) => state);

  const triesStates = useMemo(() => getTriesStates(tries, word), [tries, word])

  const onDelete = useCallback(() => deleteValue(selectedLetter), [deleteValue, selectedLetter]);

  const onConfirm = useCallback(() => {
    const wordOnList = findWord(input.join(''));

    if (wordOnList) {
      nextTry(wordOnList);
    } 
  }, [input, nextTry]);

  const onAddChar = useCallback((key: string) => {
    inputValue(key, selectedLetter)
  }, [inputValue, selectedLetter])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      const isCharKey = key.match("[a-zA-Z]*\\b") && key.length === 1;

      if (status !== GAME_STATE.PLAYING) return;

      if (isCharKey) {
        onAddChar(key);
      }

      const keysActions = {
        Backspace: () => onDelete(),
        Enter: () => onConfirm(),
        ArrowRight: () => setSelectedLetter((prevLetter) => prevLetter < BOARD_CONFIG.WORD_LENGTH - 1 ? prevLetter + 1 : -1),
        ArrowLeft: () => setSelectedLetter((prevLetter) => prevLetter > 0 ? prevLetter - 1 : prevLetter),
      }

      const action = (keysActions as any)[key];
      if (action) {
        action()
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return (): void => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [status, onAddChar, onConfirm, onDelete]);

  useEffect(() => {
    setSelectedLetter((prevLetter) => {
      const isEmptyPredicate = (l: string) => l === '';
      const firstEmpty = input.findIndex(isEmptyPredicate);
      const firstEmptyAhead = input.slice(prevLetter).findIndex(isEmptyPredicate);
      const nextEmpty = firstEmptyAhead === -1 ? -1 : firstEmptyAhead + prevLetter;

      if (nextEmpty !== -1 && nextEmpty !== prevLetter) {
        return nextEmpty;
      }

      return firstEmpty;
    });
  }, [input]);

  return (
    <>
      <S.Container>
        <Header />
        <S.BoardContainer>
          <Grid
            container
            xl={3}
            lg={4}
            md={5}
            sm={6}
            xs={12}
            rowGap={1}
            borderRadius={2}
            padding={2}
            style={{ background: "#88748b" }}
          >
            {[...Array(BOARD_CONFIG.TRIES)].map((_, index) => (
              <Row
                key={index.toString()}
                input={
                  index === rowIndex && status === GAME_STATE.PLAYING ?
                  input : tries[index]
                }
                selectedLetter={selectedLetter}
                isSelected={index === rowIndex && status === GAME_STATE.PLAYING}
                onClickLetter={(i: number) => setSelectedLetter(i)}
                rowState={triesStates[index]}
              />
            ))}
          </Grid>
        </S.BoardContainer>
        <Keyboard
          onChange={onAddChar}
          onConfirm={onConfirm}
          onDelete={onDelete}
        />
      </S.Container>
      <EndGameModal
        gameState={status}
        onClose={resetGame}
        correctWord={word}
      />
    </>
  )
}

export default Home;
