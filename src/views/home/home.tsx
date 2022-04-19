import React, { useCallback, useEffect, useState } from 'react'
import { Row } from '../../components';
import * as S from './home.style';

const ROWS = 6;

const Home = () => {
  const [rowIndex, setRowIndex] = useState(0);
  const [value, setValue] = useState('');

  const [tries, setTries] = useState(Array(ROWS).fill(''));

  const changeTry = useCallback((newValue: string) => {
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

      if (isCharKey && value.length < 5) {
        setValue(v => {
          const newValue = v + key;
          changeTry(newValue);
          return newValue;
        })
      }

      if (key === 'Backspace') {
        setValue(v => {
          const newValue = v.slice(0, -1);
          changeTry(newValue);
          return newValue;
        })
      }

      if (key === 'Enter' && rowIndex < ROWS - 1) {
        setValue('');
        setRowIndex(v => v + 1)
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return (): void => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [value.length, rowIndex, value, changeTry])

  return (
    <S.Container>
      <S.Board>
        {[...Array(ROWS)].map((_, index) => (
          <Row
            key={index.toString()}
            value={tries[index]}
            isSelected={index === rowIndex}
          />
        ))}
      </S.Board>
    </S.Container>
  )
}

export default Home;
