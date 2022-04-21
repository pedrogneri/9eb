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

  const onDelete = () => setValue(v => v.slice(0, -1));

  const onConfirm = useCallback(() => {
    const wordOnList = findWord(value);

    if (wordOnList) {
      const correctWord = wordOnList === WORD;
      const isEndGame = correctWord || rowIndex === ROWS - 1;
      setIsEndGame(isEndGame);

      setValue('');
      changeTryValue(wordOnList);
      setRowIndex(v => isEndGame ? v : v + 1)
    } 
  }, [changeTryValue, rowIndex, value]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      const isCharKey = key.match("[a-zA-Z]*\\b") && key.length === 1;

      if (endGame) return;

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
  }, [endGame, onConfirm, value.length])

  return (
    <S.Container>
      <S.BoardContainer>
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
      </S.BoardContainer>
      <Keyboard 
        word={WORD} 
        tries={tries} 
        onChange={(key: string) => {
          if (value.length < 5) {
            setValue(v => v + key);
          }
        }}
        onConfirm={onConfirm}
        onDelete={onDelete}
      />
    </S.Container>
  )
}

export default Home;
