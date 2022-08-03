import styled from 'styled-components';
import { Dialog } from '@mui/material';

export const Container = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #392a43;
    color: #eee;
    padding: 24px;
    border-radius: 10px;
  }
`;

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
  height: 200px;
`;

export const Bar = styled.div<GraphProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 6px;
  background-color: #99eebb;
  width: 10%;
  height: ${({ $percent }) => $percent}%;
  color: #392a43;
  padding: 8px;
  font-weight: bold;
`;

export const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const TryNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
  padding: .5em 0;
  line-height: 1em;
`;
