import { IconButton } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background: #392a43;
  padding: 16px 8px;
  max-width: 400px;
  z-index: 2;
  border-radius: 10px;
  position: relative;

  @media(max-width: 450px) {
    max-width: 90%;
  }
`;

export const CloseButton = styled(IconButton)`
  position: absolute !important;
  z-index: 3;
  font-size: 28px !important;
  line-height: 28px !important;
  right: 0;
  top: -6px;
  color: #eee !important;
  width: fit-content;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  color: #99eebb;
  margin-bottom: 12px;
`;

export const Description = styled.div`
  font-size: 24px;
  text-align: left;
  color: #fff;
`;

export const ColorTutorial = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;
`;

interface ColorProp {
  $color: string;
}

export const Color = styled.div<ColorProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $color }) => $color};
  border-radius: 8px;
  min-width: 32px;
  min-height: 32px;
  margin-right: 8px;
  font-size: 20px;
  font-weight: bold;
  color: #392a43;
`;

export const ColorText = styled.div`
  font-size: 20px;
  color: #fff;
  text-align: left;
`;
