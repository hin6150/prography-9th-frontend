import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Filter = ({
  length,
  index,
  setViewCount,
}: {
  length: number;
  index: number;
  setViewCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <FilterContainer>
      <p>
        {index} / {length} 조회
      </p>
      <FilterButtonContainer>
        <SelectSort />
        <SelectView setViewCount={setViewCount} />
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

const SelectSort = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const currentFilter = searchParams.get('filter') || '';
  const [selectedValue, setSelectedValue] = useState(currentFilter);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    searchParams.set('filter', e.target.value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <StyledSelect value={selectedValue} onChange={handleChange}>
      <StyledOption value='new'>최신 순</StyledOption>
      <StyledOption value='asc'>이름 오름차순</StyledOption>
      <StyledOption value='desc'>이름 내림차순</StyledOption>
    </StyledSelect>
  );
};

const SelectView = ({
  setViewCount,
}: {
  setViewCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [selectedValue, setSelectedValue] = useState(4);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(parseInt(e.target.value));
    setViewCount(parseInt(e.target.value));
  };

  return (
    <StyledSelect value={selectedValue} onChange={handleChange} $view>
      <StyledOption value={4}>4개씩 보기</StyledOption>
      <StyledOption value={2}>2개씩 보기</StyledOption>
    </StyledSelect>
  );
};

const StyledSelect = styled.select<{ $view?: boolean }>`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;

  @media (max-width: 768px) {
    display: ${(props) => (props.$view ? 'none' : 'block')};
  }

  &:hover {
    border-color: #888;
  }

  &:focus {
    border-color: #0052cc;
    outline: none;
  }
`;

const StyledOption = styled.option`
  padding: 10px;
  width: 96px;
`;

export default Filter;
