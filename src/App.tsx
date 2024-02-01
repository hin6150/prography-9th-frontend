import React from 'react';
import Header from './component/Header';
import styled from 'styled-components';
import Category from './component/Category';
import Filter from './component/Filter';
import DisplayScreen from './component/DisplayScreen';

function App() {
  return (
    <Inner>
      <Header />
      <Category />
      <Filter />
      <DisplayScreen />
    </Inner>
  );
}

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 96px auto;
  padding: 24px;
  gap: 48px;

  @media (max-width: 1200px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

export default App;
