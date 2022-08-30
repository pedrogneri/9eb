import styled from 'styled-components';

export const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  color: #99eebb;

  @media(max-width: 800px) {
    font-size: 28px;
  }
`;

export const Description = styled.div`
  font-size: 24px;
  color: #eee;

  @media(max-width: 800px) {
    font-size: 20px;
  }
`;

export const ColorTutorial = styled.div`
  display: flex;
  align-items: center;
`;

interface ColorProp {
  $color: string;
}

export const Color = styled.div<ColorProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $color }) => $color};
  border-radius: 20%;
  min-width: 32px;
  min-height: 32px;
  margin-right: .5em;
  font-size: 20px;
  font-weight: bold;
  color: #392a43;

  @media(max-width: 800px) {
    min-width: 28px;
    min-height: 28px;
  }
`;

export const Divisor = styled.div`
  border: 1px solid #eee;
  width: 100%;
`;

export const ColorText = styled.div`
  font-size: 20px;
  color: #fff;
  text-align: left;

  @media(max-width: 800px) {
    font-size: 16px;
  }
`;
