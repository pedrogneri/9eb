import React, { useState } from 'react'
import { Help } from '../../components';

import * as S from './header.style';

const Header = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <S.Container>
      <S.IconContainer>
        <S.HelpIcon onClick={() => setShowHelp(v => !v)} />
      </S.IconContainer>

      <Help show={showHelp} onClose={() => setShowHelp(false)}></Help>

      <S.Logo>
        <h1>9eb.</h1>
      </S.Logo>
    </S.Container>
  )
}

export default Header;
