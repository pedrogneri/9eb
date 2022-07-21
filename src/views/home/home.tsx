import React, { useCallback, useEffect, useState } from 'react'
import { Row, Keyboard, Header } from '../../components';
import { findWord, getRandomWord } from '../../lib/words';

import * as S from './home.style';

const ROWS = 6;
const LETTERS = 5;
const EMPTY_WORD: string[] = Array(LETTERS).fill('');

export enum GAME_STATE {
  PLAYING,
  WIN,
  LOSE,
}

const Home = () => {
  const [rowIndex, setRowIndex] = useState(0);
  const [value, setValue] = useState<string[]>(EMPTY_WORD);

  const [selectedLetter, setSelectedLetter] = useState(0);
  const [correctWord, setCorrectWord] = useState(getRandomWord());
  const [tries, setTries] = useState<string[][]>(Array(ROWS).fill(EMPTY_WORD));
  const [gameState, setGameState] = useState<GAME_STATE>(GAME_STATE.PLAYING);

  const changeTryValue = useCallback((newValue: string) => {
    setTries(v => {
      const newTries = [...v];
      newTries[rowIndex] = newValue.split('');

      return newTries;
    })
  }, [rowIndex])

  const onDelete = useCallback(() => setValue(v => {
    const newValue = [...v];
    const index = selectedLetter > -1 ? 
      selectedLetter - (v[selectedLetter] === '' ? 1 : 0) :
      LETTERS - 1;

    newValue[index] = '';

    return newValue;
  }), [selectedLetter]);

  const onConfirm = useCallback(() => {
    const wordOnList = findWord(value.join(''));

    if (wordOnList) {
      const isCorrect = wordOnList === correctWord;
      const isEndGame = isCorrect || rowIndex === ROWS - 1;

      if (isCorrect) {
        setGameState(GAME_STATE.WIN);
      } else if (rowIndex === ROWS - 1) {
        setGameState(GAME_STATE.LOSE);
      }

      setValue(EMPTY_WORD);
      changeTryValue(wordOnList);
      setRowIndex(v => isEndGame ? v : v + 1)
    } 
  }, [changeTryValue, correctWord, rowIndex, value]);

  const onAddChar = useCallback((key: string) => {
    setValue(v => {
      const newValue = [...v];
      newValue[selectedLetter] = key;
      return newValue;
    })
  }, [selectedLetter])

  const resetGame = () => {
    setGameState(GAME_STATE.PLAYING);
    setTimeout(() => {
      setCorrectWord(getRandomWord());
      setTries(Array(ROWS).fill(EMPTY_WORD));
      setRowIndex(0);
    }, 500) 
  };

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
        ArrowRight: () => setSelectedLetter((prevLetter) => prevLetter < LETTERS - 1 ? prevLetter + 1 : -1),
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
    <S.Container>
      <Header />
      <S.BoardContainer>
        <S.Board>
          {[...Array(ROWS)].map((_, index) => (
            <Row
              key={index.toString()}
              input={
                tries[index].lastIndexOf('') === LETTERS - 1 &&
                index === rowIndex ?
                value : tries[index]
              }
              selectedLetter={selectedLetter}
              isSelected={index === rowIndex}
              onClickLetter={
                index === rowIndex ?
                (i: number) => setSelectedLetter(i) :
                undefined
              }
              word={correctWord}
              filled={index < rowIndex || (index === rowIndex && gameState !== GAME_STATE.PLAYING)}
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
      <S.Modal
        open={gameState !== GAME_STATE.PLAYING}
        onClose={resetGame}
      >
        <S.Title>{gameState === GAME_STATE.WIN ? 'Você ganhou :)' : 'Você perdeu :('}</S.Title>
        <S.CorrectWord $gameState={gameState}>{correctWord}</S.CorrectWord>
      </S.Modal>
    </S.Container>
  )
}

export default Home;
