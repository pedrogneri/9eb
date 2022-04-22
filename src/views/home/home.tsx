import React, { useCallback, useEffect, useState } from 'react'
import { Row, Keyboard } from '../../components';
import { findWord, getRandomWord } from '../../lib/words';

import * as S from './home.style';

const ROWS = 6;

export type GameState = 'win' | 'lose' | 'playing';

const Home = () => {
  const [rowIndex, setRowIndex] = useState(0);
  const [value, setValue] = useState('');

  const [correctWord, setCorrectWord] = useState(getRandomWord());
  const [tries, setTries] = useState(Array(ROWS).fill(''));
  const [gameState, setGameState] = useState<GameState>('playing');

  const changeTryValue = useCallback((newValue: string) => {
    setTries(v => {
      const newTries = [...v];
      newTries[rowIndex] = newValue;

      return newTries;
    })
  }, [rowIndex])

  const onDelete = () => setValue(v => v.slice(0, -1));

  const onConfirm = useCallback(() => {
    const wordOnList = findWord(value);

    if (wordOnList) {
      const isCorrect = wordOnList === correctWord;
      const isEndGame = isCorrect || rowIndex === ROWS - 1;

      if (isCorrect) {
        setGameState('win');
      } else if (rowIndex === ROWS - 1) {
        setGameState('lose');
      }

      setValue('');
      changeTryValue(wordOnList);
      setRowIndex(v => isEndGame ? v : v + 1)
    } 
  }, [changeTryValue, correctWord, rowIndex, value]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      const isCharKey = key.match("[a-zA-Z]*\\b") && key.length === 1;

      if (gameState !== 'playing') return;

      if (isCharKey && value.length < 5) {
        setValue(v => v + key);
      }

      if (key === 'Backspace') {
        onDelete()
      }

      if (key === 'Enter') {
        onConfirm()
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return (): void => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [gameState, onConfirm, value.length])

  const resetGame = () => {
    setGameState('playing');
    setTimeout(() => {
      setCorrectWord(getRandomWord());
      setTries(Array(ROWS).fill(''));
      setRowIndex(0);
    }, 500) 
  }

  return (
    <S.Container>
      <S.BoardContainer>
        <S.Board>
          {[...Array(ROWS)].map((_, index) => (
            <Row
              key={index.toString()}
              input={!tries[index] && index === rowIndex ? value : tries[index]}
              isSelected={index === rowIndex}
              word={correctWord}
              filled={index < rowIndex || (index === rowIndex && gameState !== 'playing')}
            />
          ))}
        </S.Board>
      </S.BoardContainer>
      <Keyboard 
        word={correctWord} 
        tries={tries} 
        onChange={(key: string) => {
          if (value.length < 5) {
            setValue(v => v + key);
          }
        }}
        onConfirm={onConfirm}
        onDelete={onDelete}
      />
      <S.Modal
        open={gameState !== 'playing'}
        onClose={resetGame}
      >
        <S.Title>{gameState === 'win' ? 'Você ganhou :)' : 'Você perdeu :('}</S.Title>
        <S.CorrectWord $gameState={gameState}>{correctWord}</S.CorrectWord>
      </S.Modal>
    </S.Container>
  )
}

export default Home;
