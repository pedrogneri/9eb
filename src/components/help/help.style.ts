import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: #88748B;
  padding: 16px 8px;
  min-width: 400px;
  max-width: 300px;
  left: 0;
  top: 62px;
  z-index: 3;
  border-radius: 10px;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: -20px;
    left: 20px;
    width: 0;
    height: 0;
    border-bottom: 50px solid #88748B;
    border-right: 50px solid transparent;
  }
`;

export const Title = styled.div`
  font-family: 'Rubik Mono One';
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  text-align: center;
  color: #99eebb;
`;

export const Description = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
  text-align: center;
  color: #fff;
`;
