import React, { useMemo } from 'react'
import { BOARD_CONFIG, GAME_STATE } from '../../constants';
import { useStore } from '../../store';
import * as S from './stats.style';

type Props = {
  show: boolean;
  onClose: Function;
}

const Stats = ({ show, onClose }: Props) => {
  const {
    history
  } = useStore((state) => state);
  const triesScores = useMemo(() => {
    const scores = Array(BOARD_CONFIG.TRIES + 1).fill(0)
    history.forEach(({ tries, status }) => {
      if (status === GAME_STATE.LOSE) {
        scores[BOARD_CONFIG.TRIES] += 1;
        return
      }
      scores[tries - 1] += 1;
    });

    return scores;
  }, [history])
  const calculatePercent = (value: number) => value / history.length * 100;

  return (
    <S.Container
      open={show}
      onClose={() => onClose()}
    >
      <S.Title>Estatísticas</S.Title>
      <S.Graph>
        {triesScores.map((value, index) => (
          <S.BarContainer>
            <S.Bar $percent={calculatePercent(value)}>{value}</S.Bar>
            <S.TryNumber>{index === BOARD_CONFIG.TRIES ? "💀" : index + 1}</S.TryNumber>
          </S.BarContainer>
        ))}
      </S.Graph>
    </S.Container>
  );
}

export default Stats;
