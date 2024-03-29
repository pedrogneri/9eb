import styled, { css } from 'styled-components';
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
  cursor: pointer;
  width: 100%;

  @media(max-width: 800px) {
    font-size: 20px;
  }
`;

export const SpecialKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  border-radius: 8px;
  cursor: pointer;

  @media(max-width: 800px) {
    font-size: 16px;
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