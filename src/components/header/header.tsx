import React, { useState } from 'react'
import { Help, Stats } from '../../components';

import * as S from './header.style';

const Header = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);

  return (
    <>  
      <S.Container>
        <S.IconContainer onClick={() => setShowHelp(v => !v)}>
          <S.HelpIcon />
        </S.IconContainer>
        <S.LogoContainer>
          <S.Logo>
            <h1>9eb.</h1>
          </S.Logo>
        </S.LogoContainer>
        <S.RightContainer>
          <S.IconContainer onClick={() => setShowStats(v => !v)}>
            <S.StatsIcon />
          </S.IconContainer>
        </S.RightContainer>
      </S.Container>

      <Help show={showHelp} onClose={() => setShowHelp(false)}></Help>
      <Stats show={showStats} onClose={() => setShowStats(false)}></Stats>
    </>
  )
}

export default Header;
