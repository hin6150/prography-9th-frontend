import React from 'react';
import styled from 'styled-components';

const Filter = ({ length, index }: { length: number; index: number }) => {
  return (
    <FilterContainer>
      <p>
        {index}/{length} 조회
      </p>
      <FilterButtonContainer>
        <ListButton str='최신순' />
        <ListButton str='4개씩 보기' />
      </FilterButtonContainer>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  height: 32px;
  justify-content: space-between;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ListButton = ({ str }: { str: string }) => {
  return (
    <ListButtonContainer>
      <p>{str}</p>
      <p>^</p>
    </ListButtonContainer>
  );
};

const ListButtonContainer = styled.div`
  display: flex;
  width: 96px;
  justify-content: space-between;
  border: 1px solid black;
  padding: 0 16px;
  background-color: white;
  border-radius: 16px;
`;

export default Filter;
