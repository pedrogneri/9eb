import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { State } from './letter';

type SelectedProps = {
  $isSelected: boolean;
  $state: State;
}

export const Container = styled.div<SelectedProps>`
  ${({ $isSelected, $state }): FlattenSimpleInterpolation => {
    let color = '#eee';

    if ($state === 'contain') {
      color = '#e9eb87'
    } else if ($state === 'correct') {
      color = '#99eebb'
    } else if ($state === 'incorrect') {
      color = 'rgba(238, 238, 238, 0.6)' 
    }

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      background-color: ${color};
      width: 48px;
      height: 48px;
      border-radius: 8px;
      font-weight: bold;
      color: ${$state === 'incorrect' ? 'rgba(57, 42, 67, 0.6)' : '#392a43'};
      border: 3px solid;
      border-color: ${$isSelected ? '#392a43' : 'transparent'}
    `;
  }}
`