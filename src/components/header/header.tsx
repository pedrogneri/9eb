import React, { useState } from 'react'
import { Help } from '../../components';

import * as S from './header.style';

const Header = () => {
  const [showHelp, setShowHelp] = useState(false);

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
      </S.Container>
      <Help show={showHelp} onClose={() => setShowHelp(false)}></Help>
    </>
  )
}

export default Header;
