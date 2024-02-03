import React from 'react';
import styled from 'styled-components';

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Container
      onClick={() => {
        scrollToTop();
      }}
    >
      Top
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 60px;
  right: 60px;
  position: fixed;
  z-index: 10;
  background-color: #eee;
  border-radius: 24px;
  width: 80px;
  height: 80px;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.2),
    0px 2px 4px -1px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.12);
  }

  @media (max-width: 1280px) {
    bottom: 24px;
    right: 24px;
    width: 64px;
    height: 64px;
    opacity: 0.4;
    &:hover {
      opacity: 1;
    }
  }
`;

export default ScrollToTop;
