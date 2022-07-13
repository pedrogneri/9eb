import { Dialog } from '@mui/material';
import styled from 'styled-components';
import { GameState } from './home';

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
  padding: 2em;
  background-color: #88748b;
  border-radius: 10px;

  @media(max-width: 800px) {
    padding: 12px;
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
  $gameState: GameState;
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
  color: ${({ $gameState }) => $gameState === 'win' ? '#99eebb' : '#e87172'};
`;

export const Title = styled.div`
  font-size: 28px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const Logo = styled.div`
  margin: 2vh 0;

  h1 {
    font-size: 5vh;
    color: #99eebb;
    overflow: hidden;
    font-family: 'Rubik Mono One', sans-serif;
    border-right: .15em solid #eee;
    white-space: nowrap;
    margin: 0 auto;
    text-shadow: 5px 5px #88748b;
    letter-spacing: .10em;
    animation: 
    typing 1s steps(4, end),
    blink-caret .75s step-end infinite;
  }

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }

  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #eee; }
  }
`;