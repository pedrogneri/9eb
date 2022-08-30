import { Grid } from '@mui/material';
import React, { useMemo } from 'react'
import { BOARD_CONFIG, GAME_STATE } from '../../constants';
import { useStore } from '../../store';
import { Modal } from '../modal';
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

  const statsEntries = useMemo(() => ([
    { name: "Partidas", value: history.length },
    { name: "Sequência", value: victorySequency },
    { name: "Acertos", value: `${victoryPercentage}%` },
  ]), [history.length, victoryPercentage, victorySequency])

  return (
    <Modal
      show={show}
      onClose={() => onClose()}
    >
      <Grid
        container
        flexDirection={"column"}
        gap={4}
      >
        <S.Title>Estatísticas</S.Title>
        <Grid 
          container
          item
        >
          {statsEntries.map(({ name, value }, i) => (
            <Grid
              key={i.toString()}
              container
              item
              xs={4}
              justifyContent={"center"}
              sx={i < statsEntries.length - 1 ? {
               borderRight: "1px solid #eee",
              } : {}}
            >
              <S.StatsData>
                {name}
                <b>{value}</b>
              </S.StatsData>
            </Grid>
          ))}
        </Grid>
      
        <Grid
          container
          item
          flexDirection={"column"}
          gap={1.5}
        >
          {triesScores.map((value, index) => (
            <Grid
              key={index.toString()}
              container
              item
            >
              <Grid container item xs={1}>
                <S.TryNumber>
                  {index === BOARD_CONFIG.TRIES ? "💀" : index + 1}
                </S.TryNumber>
              </Grid>   
              <Grid container item xs={11}>
                <S.Bar $percent={calculatePercent(value)}>
                  {value}
                </S.Bar>
              </Grid>   
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Modal>
  );
}

export default Stats;
