import styled from 'styled-components';
import { Dialog } from '@mui/material';
import { GAME_STATE } from '../../constants';

export const Container = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #392a43;
    color: #eee;
    padding: 24px;
    border-radius: 10px;
  }
`;

type WordProps = {
  $gameState?: GAME_STATE;
}

export const CorrectWord = styled.div<WordProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: bold;
  color: #eee;
  padding: 24px 0;
  font-size: 48px;
  text-transform: uppercase;
  color: ${({ $gameState }) => $gameState === GAME_STATE.WIN ? '#99eebb' : '#e87172'};
`;

export const Title = styled.div`
  font-size: 28px;
  text-transform: uppercase;
  font-weight: bold;
`;
