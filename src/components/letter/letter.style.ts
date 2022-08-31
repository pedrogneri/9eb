import styled, { keyframes, css, FlattenSimpleInterpolation } from 'styled-components';
import { LETTER_STATE } from '../../constants';
import { headShake } from 'react-animations';

type SelectedProps = {
  $isSelected: boolean;
  $isPressed: boolean;
  $state: LETTER_STATE;
  $incorrect?: boolean
}

const STATE_COLORS = {
  [LETTER_STATE.DEFAULT]: '#eee',
  [LETTER_STATE.CONTAIN]: '#e9eb87',
  [LETTER_STATE.CORRECT]: '#99eebb',
  [LETTER_STATE.INCORRECT]: 'rgba(238, 238, 238, 0.6)',
}

const pulseAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {-webkit-transform: translateY(0);} 
  40% {-webkit-transform: translateY(-14%);} 
  60% {-webkit-transform: translateY(-7%);}
`;

const shakeAnimation = keyframes`${headShake}`;

export const Container = styled.div<SelectedProps>`
  ${({ $isSelected, $state, $isPressed, $incorrect }): FlattenSimpleInterpolation => {
    const color = STATE_COLORS[$state]

    return css`
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      background-color: ${color};
      width: 52px;
      height: 52px;
      border-radius: 20%;
      font-weight: bold;
      border-style: solid;
      color: ${$state === LETTER_STATE.INCORRECT ? 'rgba(57, 42, 67, 0.6)' : '#392a43'};
      border-color: ${$isSelected ? '#392a43' : 'transparent'};
      border-width: 3px;
      box-sizing: border-box;

      ${$isPressed ?
      css`
        animation: .2s ${pulseAnimation};
      ` : ''}

      ${$incorrect ?
      css`
        animation: .5s ${shakeAnimation};
      ` : ''}

      @media (max-width: 800px) {
        border-width: 2px;
      }

      ${$isPressed ? css`
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          height: 6px;
          width: 100%;
          background-color: #392a43
        }
      ` : ''}
    `;
  }}
`;
