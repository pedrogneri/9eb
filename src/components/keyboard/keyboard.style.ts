import styled, { css } from 'styled-components';
import { Letter } from '../letter';
import { MdThumbUp, MdBackspace } from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 12px;
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

  width: 52px;
  height: 62px;

  @media(max-width: 800px) {
    width: 34px;
    height: 48px;
    font-size: 20px;
    margin: 2px;
  }
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

  @media(max-width: 800px) {
    width: 100px;
    height: 32px;
    font-size: 16px;
    margin: 3px;
  }
`;

const iconStyle = css`
  height: 48px;
  width: 48px;
  color: #392a43;

  @media(max-width: 800px) {
    width: 32px;
    height: 32px;
  }
`;

export const Like = styled(MdThumbUp)`
  ${iconStyle}
`;

export const Delete = styled(MdBackspace)`
  ${iconStyle}
`;