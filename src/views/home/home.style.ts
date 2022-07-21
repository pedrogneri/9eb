import { Dialog } from '@mui/material';
import styled from 'styled-components';
import { GAME_STATE } from './home';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`

export const Board = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  background-color: #88748b;
  border-radius: 10px;

  @media(max-width: 800px) {
    margin: 0;
  }
`;

export const BoardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;

  @media(max-width: 800px) {
    height: inherit;
    margin-bottom: 0;
  }
`;

export const KeyboardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #392a43;
    color: #eee;
    padding: 24px;
    border-radius: 10px;
  }
`;

type WordProps = {
  $gameState: GAME_STATE;
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
