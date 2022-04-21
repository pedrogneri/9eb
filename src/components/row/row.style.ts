import styled from 'styled-components';
import { Letter } from '../letter';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const StyledLetter = styled(Letter)`
  margin: 4px;

  @media(max-width: 800px) {
    width: 36px;
    height: 36px;
    font-size: 32px;
    border-width: 2px;
  }
`;
