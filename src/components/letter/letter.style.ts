import styled, { keyframes, css, FlattenSimpleInterpolation } from 'styled-components';
import { LETTER_STATE } from '../../constants';
import { headShake } from 'react-animations';

type SelectedProps = {
  $isSelected: boolean;
  $isPressed: boolean;
  $state: LETTER_STATE;
  $incorrect?: boolean
}

const pulseAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {-webkit-transform: translateY(0);} 
  40% {-webkit-transform: translateY(-14%);} 
  60% {-webkit-transform: translateY(-7%);}
`;

const shakeAnimation = keyframes`${headShake}`;

export const Container = styled.div<SelectedProps>`
  ${({ $isSelected, $state, $isPressed, $incorrect }): FlattenSimpleInterpolation => {
    let color = '#eee';

    if ($state === LETTER_STATE.CONTAIN) {
      color = '#e9eb87'
    } else if ($state === LETTER_STATE.CORRECT) {
      color = '#99eebb'
    } else if ($state === LETTER_STATE.INCORRECT) {
      color = 'rgba(238, 238, 238, 0.6)' 
    }

    return css`
      display: flex;
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
      border-width: ${$isPressed ? '3px 3px 10px 3px' : '3px'};
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
        border-width: ${$isPressed ? '2px 2px 8px 2px' : '2px'};
      }
    `;
  }}
`;
