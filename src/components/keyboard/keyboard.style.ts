import styled from 'styled-components';
import { Letter } from '../letter';
import { MdThumbUp, MdBackspace } from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const Key = styled(Letter)`
  margin: 4px;
  cursor: pointer;
`;

export const SpecialKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 52px;
  background-color: #eee;
  border-radius: 8px;
  margin: 4px;
  cursor: pointer;
`;

export const Like = styled(MdThumbUp)`
  height: 48px;
  width: 48px;
  color: #392a43;
`;

export const Delete = styled(MdBackspace)`
  height: 48px;
  width: 48px;
  color: #392a43;
`;