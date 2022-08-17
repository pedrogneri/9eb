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
  const victoryPercentage = useMemo(() => history.length > 0 ? (history.filter(v => v.status === GAME_STATE.WIN).length / history.length * 100).toFixed(1) : 0, [history])
  const victorySequency = useMemo(() => {
    const lastLose = [...history].reverse().find(v => v.status === GAME_STATE.LOSE)
    const lastLoseIndex = lastLose && history.lastIndexOf(lastLose);

    if (lastLoseIndex) {
      return history.slice(lastLoseIndex).length - 1
    }

    return history.length;
  }, [history])

  const calculatePercent = (value: number) => value / history.length * 100;

  return (
    <S.Container
      open={show}
      onClose={() => onClose()}
    >
      <S.Title>Estatísticas</S.Title>
      <S.Graph>
        <S.StatsDataContainer>
          <S.StatsData>Partidas <b>{history.length}</b></S.StatsData>
          <S.StatsData>Acertos <b>{victoryPercentage}%</b></S.StatsData>
          <S.StatsData>Sequência <b>{victorySequency}</b></S.StatsData>
        </S.StatsDataContainer>
       
        <br/>
        <S.PerTryStats>Acertos por tentativa</S.PerTryStats>
        {triesScores.map((value, index) => (
          <S.BarContainer key={index.toString()}>
            <S.TryNumber>{index === BOARD_CONFIG.TRIES ? "💀" : index + 1}</S.TryNumber>
            <S.Bar $percent={calculatePercent(value)}>{value}</S.Bar>
          </S.BarContainer>
        ))}
      </S.Graph>
    </S.Container>
  );
}

export default Stats;
