import styled from 'styled-components';
import { GAME_STATE } from '../../constants';

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
