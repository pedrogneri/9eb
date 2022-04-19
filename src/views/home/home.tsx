import React from 'react'
import { Row } from '../../components';
import * as S from './home.style';

const Home = () => {
  return (
    <S.Container>
      <S.Board>
        {[...Array(6)].map(() => (
          <Row />
        ))}
      </S.Board>
    </S.Container>
  )
}

export default Home;
