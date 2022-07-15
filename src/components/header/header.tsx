import React, { useState } from 'react'
import { Help } from '../../components';

import * as S from './header.style';

const Header = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <S.Container>
      <S.IconContainer>
        <S.HelpIcon onClick={() => setShowHelp(v => !v)} />
        <Help show={showHelp}></Help>
      </S.IconContainer>
      <S.Logo>
        <h1>9eb.</h1>
      </S.Logo>
    </S.Container>
  )
}

export default Header;