import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`

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
