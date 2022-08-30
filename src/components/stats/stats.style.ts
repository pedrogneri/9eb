import styled from 'styled-components';

interface GraphProps {
  $percent: number;
}

export const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 28px;
  font-weight: bold;
`;

export const StatsData = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  color: #eee;
  font-weight: bold;
  flex-direction: column;
  padding: .25em;

  b {
    margin-top: .25em;
    color: #99eebb;
  }

  @media (max-width: 800px) {
    font-size: 1em;
  }
`;

export const Bar = styled.div<GraphProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #99eebb;
  width: ${({ $percent }) => $percent}%;
  color: #392a43;
  padding: .2em .5em;
  font-weight: bold;
  font-size: 1em;

  @media (max-width: 800px) {
    padding: 0 .5em;
  }
`;

export const TryNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
  width: 1em;
  font-weight: bold;
`;
