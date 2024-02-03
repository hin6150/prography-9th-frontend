import React, { useEffect } from 'react';
import Header from './component/Header';
import styled from 'styled-components';
import Category from './component/Category';
import Filter from './component/Filter';
import DisplayScreen from './component/DisplayScreen';
import { useLocation } from 'react-router-dom';
import { useFetchMeals } from './hooks/FetchApi';
import ScrollToTop from './component/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { setIndex, setMealsData, sortMeals } from './store/slice';
import { RootState } from './store/store';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const categories = queryParams.get('category') || '';
  const filter = queryParams.get('filter') || '';

  const { index } = useSelector((state: RootState) => state.slice);

  const { meals, isLoading } = useFetchMeals(categories);

  // mealsData와 index 상태 업데이트
  useEffect(() => {
    dispatch(setMealsData(meals));
    if (meals.length === 0) {
      dispatch(setIndex(0));
    } else if (index < meals.length || index > meals.length) {
      dispatch(setIndex(Math.min(20, meals.length)));
    }
  }, [meals.length, categories]);

  // 필터링에 따른 정렬
  useEffect(() => {
    dispatch(sortMeals(filter));
  }, [filter, categories, isLoading]);

  return (
    <Inner>
      <Header />
      <Category />
      <Filter />
      <DisplayScreen isLoading={isLoading} />
      <ScrollToTop />
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
  box-sizing: border-box;

  @media (max-width: 1280px) {
    width: 100%;
  }
`;

export default App;
