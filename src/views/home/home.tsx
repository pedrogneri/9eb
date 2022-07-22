import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useStore } from '../../store';

import { Row, Keyboard, Header, EndGameModal } from '../../components';
import { findWord, getTriesStates } from '../../lib/words';
import { BOARD_CONFIG, GAME_STATE } from '../../constants';

import * as S from './home.style';

const EMPTY_WORD: string[] = Array(BOARD_CONFIG.WORD_LENGTH).fill('');

const Home = () => {
  const [value, setValue] = useState<string[]>(EMPTY_WORD);
  const [selectedLetter, setSelectedLetter] = useState(0);

  const correctWord = useStore((state) => state.word);
  const resetGame = useStore((state) => state.resetGame);
  const updateRowIndex = useStore((state) => state.updateRowIndex);

  const rowIndex = useStore((state) => state.rowIndex);
  const [tries, setTries] = useStore((state) => [state.tries, state.setTries]);
  const [gameState, setGameState] = useStore((state) => [state.status, state.setStatus]);

  const triesStates = useMemo(() => getTriesStates(tries, correctWord), [tries, correctWord])

  const changeTryValue = useCallback((newValue: string) => {
    const newTries = [...tries];
    newTries[rowIndex] = newValue.split('');

    setTries(newTries)
  }, [rowIndex, setTries, tries])

  const onDelete = useCallback(() => setValue(v => {
    const newValue = [...v];
    const index = selectedLetter > -1 ? 
      selectedLetter - (v[selectedLetter] === '' ? 1 : 0) :
      BOARD_CONFIG.WORD_LENGTH - 1;

    newValue[index] = '';

    return newValue;
  }), [selectedLetter]);

  const onConfirm = useCallback(() => {
    const wordOnList = findWord(value.join(''));

    if (wordOnList) {
      const isCorrect = wordOnList === correctWord;

      if (isCorrect) {
        setGameState(GAME_STATE.WIN);
      } else if (rowIndex === BOARD_CONFIG.TRIES - 1) {
        setGameState(GAME_STATE.LOSE);
      }

      setValue(EMPTY_WORD);
      changeTryValue(wordOnList);
      updateRowIndex();
    } 
  }, [changeTryValue, correctWord, updateRowIndex, rowIndex, setGameState, value]);

  const onAddChar = useCallback((key: string) => {
    setValue(v => {
      const newValue = [...v];
      newValue[selectedLetter] = key;
      return newValue;
    })
  }, [selectedLetter])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      const isCharKey = key.match("[a-zA-Z]*\\b") && key.length === 1;

      if (gameState !== GAME_STATE.PLAYING) return;

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
  }, [gameState, onAddChar, onConfirm, onDelete, value.length]);

  useEffect(() => {
    setSelectedLetter((prevLetter) => {
      const isEmptyPredicate = (l: string) => l === '';
      const firstEmpty = value.findIndex(isEmptyPredicate);
      const firstEmptyAhead = value.slice(prevLetter).findIndex(isEmptyPredicate);
      const nextEmpty = firstEmptyAhead === -1 ? -1 : firstEmptyAhead + prevLetter;

      if (nextEmpty !== -1 && nextEmpty !== prevLetter) {
        return nextEmpty;
      }

      return firstEmpty;
    });
  }, [value]);

  return (
    <>
      <S.Container>
        <Header />
        <S.BoardContainer>
          <S.Board>
            {[...Array(BOARD_CONFIG.TRIES)].map((_, index) => (
              <Row
                key={index.toString()}
                input={
                  index === rowIndex && gameState === GAME_STATE.PLAYING ?
                  value : tries[index]
                }
                selectedLetter={selectedLetter}
                isSelected={index === rowIndex && gameState === GAME_STATE.PLAYING}
                onClickLetter={(i: number) => setSelectedLetter(i)}
                rowState={triesStates[index]}
              />
            ))}
          </S.Board>
        </S.BoardContainer>
        <Keyboard
          word={correctWord} 
          tries={tries} 
          onChange={onAddChar}
          onConfirm={onConfirm}
          onDelete={onDelete}
        />
      </S.Container>
      <EndGameModal
        gameState={gameState}
        onClose={resetGame}
        correctWord={correctWord}
      />
    </>
  )
}

export default Home;
