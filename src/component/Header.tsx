import React from 'react';
import logoImage from '../assets/images/logo.png';
import styled from 'styled-components';

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <HeaderContainer>
      <LogoImage
        src={logoImage}
        width={120}
        onClick={() => {
          scrollToTop();
        }}
      />
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

const LogoImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export default Header;
