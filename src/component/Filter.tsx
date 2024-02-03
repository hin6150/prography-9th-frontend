import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CountSpan,
  FilterButtonContainer,
  FilterContainer,
  SelectContainer,
} from './Component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setViewCount } from '../store/slice';

const Filter = () => {
  const { index, mealsData } = useSelector((state: RootState) => state.slice);

  return (
    <FilterContainer>
      <p>
        <CountSpan>{index}</CountSpan> /{' '}
        <CountSpan>{mealsData.length}</CountSpan> 조회
      </p>
      <FilterButtonContainer>
        <SelectSort />
        <SelectView />
      </FilterButtonContainer>
    </FilterContainer>
  );
};

const SelectSort = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('filter', e.target.value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <SelectContainer onChange={handleChange}>
      <option value='new'>최신 순</option>
      <option value='asc'>이름 오름차순</option>
      <option value='desc'>이름 내림차순</option>
    </SelectContainer>
  );
};

const SelectView = () => {
  const dispatch = useDispatch();
  const { viewCount } = useSelector((state: RootState) => state.slice);

  return (
    <SelectContainer
      value={viewCount}
      onChange={(e) => {
        dispatch(setViewCount(parseInt(e.target.value)));
      }}
      $view
    >
      <option value={4}>4개씩 보기</option>
      <option value={2}>2개씩 보기</option>
    </SelectContainer>
  );
};

export default Filter;
