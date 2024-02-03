import React, { useEffect, useState } from 'react';
import Header from './component/Header';
import styled from 'styled-components';
import Category from './component/Category';
import Filter from './component/Filter';
import DisplayScreen from './component/DisplayScreen';
import { useQueries } from 'react-query';
import { mealType } from './data/data';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function App() {
  const [index, setIndex] = useState(0);
  const [viewCount, setViewCount] = useState(4);
  const [mealsData, setMealsData] = useState<mealType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categories = queryParams.get('category') || '';
  const filter = queryParams.get('filter') || '';

  const fetchMeal = async (category: string) => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    return response.data.meals;
  };

  const mealQueries = categories.split(',').map((category) => {
    return {
      queryKey: ['meal', category],
      queryFn: () => fetchMeal(category),
      enabled: !!category,
    };
  });

  const results = useQueries(mealQueries);

  const meals: mealType[] = results
    .filter((result) => !result.isLoading && result.isSuccess)
    .flatMap((result) => result.data || [])
    .map((meal) => ({
      ...meal,
      strMeal: meal.strMeal.trimStart(), // strMeal 필드의 앞쪽 공백 제거
    }));

  // 데이터 로딩 상태 업데이트
  useEffect(() => {
    setIsLoading(results.some((result) => result.isLoading));
  }, [results]);

  // mealsData와 index 상태 업데이트
  useEffect(() => {
    setMealsData(meals);
    if (meals.length === 0) {
      setIndex(0);
    } else if (index === 0 || index > meals.length) {
      setIndex(Math.min(20, meals.length));
    }
  }, [meals.length, categories]);

  // 필터에 따른 정렬
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
