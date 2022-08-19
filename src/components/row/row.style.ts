import styled from 'styled-components';
import { Letter } from '../letter';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const StyledLetter = styled(Letter)`
  @media(max-width: 800px) {
    width: 48px;
    height: 48px;
    font-size: 32px;
  }

  @media(max-width: 400px) {
    width: 42px;
    height: 42px;
    font-size: 28px;
  }
`;
