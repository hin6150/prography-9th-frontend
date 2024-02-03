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
        <CountSpan>{index}</CountSpan> / <CountSpan>{length}</CountSpan> 조회
      </p>
      <FilterButtonContainer>
        <SelectSort />
        <SelectView setViewCount={setViewCount} />
      </FilterButtonContainer>
    </FilterContainer>
  );
};

const CountSpan = styled.span`
  text-decoration: underline;
`;

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

  const [selectedValue, setSelectedValue] = useState('new');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    searchParams.set('filter', e.target.value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <SelectContainer value={selectedValue} onChange={handleChange}>
      <option value='new'>최신 순</option>
      <option value='asc'>이름 오름차순</option>
      <option value='desc'>이름 내림차순</option>
    </SelectContainer>
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
    <SelectContainer value={selectedValue} onChange={handleChange} $view>
      <option value={4}>4개씩 보기</option>
      <option value={2}>2개씩 보기</option>
    </SelectContainer>
  );
};

const SelectContainer = styled.select<{ $view?: boolean }>`
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

export default Filter;
