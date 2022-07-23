import styled from 'styled-components';
import { MdOutlineHelp } from 'react-icons/md';
import { IconButton } from '@mui/material';

export const Container = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  max-width: 700px;
  margin: 2vh 0;
`;

export const IconContainer = styled(IconButton)`
  width: fit-content;
`;

export const HelpIcon = styled(MdOutlineHelp)`
  color: #fff;
  width: 44px;
  height: 44px;

  @media(max-width: 800px) {
    width: 32px;
    height: 32px;
  }
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
    border-right: .15em solid #eee;
    white-space: nowrap;
    margin: 0 auto;
    text-shadow: 5px 4px #88748b;
    letter-spacing: .10em;
    width: fit-content;
    animation:
      typing 1s steps(4, end),
      blink-caret .75s step-end infinite;
  }

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }

  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #eee; }
  }
`;
