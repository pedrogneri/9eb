import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { LETTER_STATE } from '../../constants';

type SelectedProps = {
  $isSelected: boolean;
  $isPressed: boolean;
  $state: LETTER_STATE;
}

export const Container = styled.div<SelectedProps>`
  ${({ $isSelected, $state, $isPressed }): FlattenSimpleInterpolation => {
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
      border-radius: 8px;
      font-weight: bold;
      border-style: solid;
      color: ${$state === LETTER_STATE.INCORRECT ? 'rgba(57, 42, 67, 0.6)' : '#392a43'};
      border-color: ${$isSelected ? '#392a43' : 'transparent'};
      border-width: ${$isPressed ? '3px 3px 8px 3px' : '3px'};
      box-sizing: border-box;
    `;
  }}
`