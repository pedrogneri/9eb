import styled from 'styled-components';
import { Letter } from '../letter';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const StyledLetter = styled(Letter)`
  @media(max-width: 800px) {
    width: 42px;
    height: 42px;
    font-size: 32px;
  }
`;
