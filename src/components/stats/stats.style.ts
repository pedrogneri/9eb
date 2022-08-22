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
  margin-bottom: 12px;
`;

export const Graph = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Bar = styled.div<GraphProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6px;
  background-color: #99eebb;
  width:  ${({ $percent }) => $percent}%;
  height: 10%;
  color: #392a43;
  padding: .25em .5em;
  font-weight: bold;
`;

export const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
`;

export const StatsData = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  color: #eee;
  font-weight: bold;
  flex-direction: column;

  b {
    margin: .1em .5em;
    color: #99eebb;
  }
`;

export const StatsDataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5em;
`;

export const PerTryStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #eee;
  font-weight: bold;
`;

export const TryNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
  padding: .5em 0;
  width: 1em;
  font-weight: bold;
`;
