import styled from 'styled-components';

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
