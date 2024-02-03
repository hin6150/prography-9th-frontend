import React, { useEffect, useState } from 'react';
import Header from './component/Header';
import styled from 'styled-components';
import Category from './component/Category';
import Filter from './component/Filter';
import DisplayScreen from './component/DisplayScreen';
import { mealType } from './type/type';
import { useLocation } from 'react-router-dom';
import { useFetchMeals } from './hooks/FetchApi';
import ScrollToTop from './component/ScrollToTop';

function App() {
  const [index, setIndex] = useState(0);
  const [viewCount, setViewCount] = useState(4);
  const [mealsData, setMealsData] = useState<mealType[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categories = queryParams.get('category') || '';
  const filter = queryParams.get('filter') || '';

  const { meals, isLoading } = useFetchMeals(categories);

  // mealsData와 index 상태 업데이트
  useEffect(() => {
    setMealsData(meals);
    if (meals.length === 0) {
      setIndex(0);
    } else if (index === 0 || index > meals.length) {
      setIndex(Math.min(20, meals.length));
    }
  }, [meals.length, categories]);

  // 필터링에 따른 정렬
  useEffect(() => {
    const sortedMeals = [...meals];

    switch (filter) {
      case 'new':
        sortedMeals.sort((a, b) => b.idMeal - a.idMeal);
        break;
      case 'asc':
        sortedMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        break;
      case 'desc':
        sortedMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
        break;
      default:
        sortedMeals.sort((a, b) => b.idMeal - a.idMeal);
        break;
    }

    setMealsData(sortedMeals);
  }, [filter, categories, isLoading]);

  return (
    <Inner>
      <Header />
      <Category />
      <Filter
        length={mealsData.length}
        index={index}
        setViewCount={setViewCount}
      />
      <DisplayScreen
        meals={mealsData}
        setIndex={setIndex}
        index={index}
        viewCount={viewCount}
        isLoading={isLoading}
      />
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
