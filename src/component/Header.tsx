import React from 'react';
import logoImage from '../assets/images/logo.png';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <img src={logoImage} width={120} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  z-index: 5;

  left: 0;
  top: 0;
  background-color: white;
  padding: 24px;
  box-sizing: border-box;
`;

export default Header;
