import React, { useEffect, useState } from 'react'
import { Letter } from '../letter';
import * as S from './row.style';

const Row = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      const isCharKey = key.match("[a-zA-Z]*\\b") && key.length === 1;

      if (isCharKey && value.length < 5) {
        setValue(v => v + key)
      }

      if (key === 'Backspace') {
        setValue(v => v.slice(0, -1));
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return (): void => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [value.length])

  return (
    <S.Container>
      {[...Array(5)].map((_, index) => (
        <Letter key={index.toString()} value={value[index] || ''} />
      ))}
    </S.Container>
  )
}

export default Row;
