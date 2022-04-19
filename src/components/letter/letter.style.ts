import styled from 'styled-components';

type SelectedProps = {
  $isSelected: boolean;
}

export const Container = styled.div<SelectedProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  background-color: #e2e2e2;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  font-weight: bold;
  border: 2px solid;
  border-color: ${({  $isSelected }) =>  $isSelected ? '#333' : 'transparent'}
`