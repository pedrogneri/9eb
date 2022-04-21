import React, { useCallback, useEffect, useState } from 'react'
import { Row, Keyboard } from '../../components';
import { findWord, getRandomWord } from '../../lib/words';
import * as S from './home.style';

const ROWS = 6;
const WORD = getRandomWord();

const Home = () => {
  const [rowIndex, setRowIndex] = useState(0);
  const [value, setValue] = useState('');

  const [tries, setTries] = useState(Array(ROWS).fill(''));
  const [endGame, setIsEndGame] = useState(false);

  const changeTryValue = useCallback((newValue: string) => {
    setTries(v => {
      const newTries = [...v];
      newTries[rowIndex] = newValue;

      return newTries;
    })
  }, [rowIndex])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      const isCharKey = key.match("[a-zA-Z]*\\b") && key.length === 1;

      if (endGame) return;

      if (isCharKey && value.length < 5) {
        setValue(v => v + key);
      }

      if (key === 'Backspace') {
        setValue(v => v.slice(0, -1));
      }

      if (key === 'Enter') {
        const wordOnList = findWord(value);

        if (wordOnList) {
          const correctWord = wordOnList === WORD;
          const isEndGame = correctWord || rowIndex === ROWS - 1;
          setIsEndGame(isEndGame);

          setValue('');
          changeTryValue(wordOnList);
          setRowIndex(v => isEndGame ? v : v + 1)
        } 
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return (): void => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [changeTryValue, endGame, rowIndex, value])

  return (
    <S.Container>
      <S.Board>
        {[...Array(ROWS)].map((_, index) => (
          <Row
            key={index.toString()}
            input={!tries[index] && index === rowIndex ? value : tries[index]}
            isSelected={index === rowIndex}
            word={WORD}
            filled={index < rowIndex || (index === rowIndex && endGame)}
          />
        ))}
      </S.Board>
      <Keyboard word={WORD} tries={tries} onChange={(key: string) => {
        if (value.length < 5) {
          setValue(v => v + key);
        }
      }} />
    </S.Container>
  )
}

export default Home;
