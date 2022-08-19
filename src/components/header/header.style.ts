import styled, { css } from 'styled-components';
import { MdOutlineHelp } from 'react-icons/md';
import { ImStatsBars } from 'react-icons/im';
import { IconButton } from '@mui/material';

export const Container = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  max-width: 700px;
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const IconContainer = styled(IconButton)`
  width: fit-content;
`;

const icon = css`
  color: #fff;
  width: 36px;
  height: 36px;

  @media(max-width: 800px) {
    width: 32px;
    height: 32px;
  }
`;

export const HelpIcon = styled(MdOutlineHelp)`
  ${icon}
`;

export const StatsIcon = styled(ImStatsBars)`
  ${icon}
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.div`
  width: fit-content;

  h1 {
    font-size: 5vh;
    color: #99eebb;
    overflow: hidden;
    font-family: 'Rubik Mono One', sans-serif;
    border-right: .15em solid transparent;
    white-space: nowrap;
    margin: 0 auto;
    text-shadow: .2vh .3vh #88748b;
    letter-spacing: .1em;
    width: fit-content;
  }
`;
