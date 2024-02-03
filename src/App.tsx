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
    .sort((a, b) => b.idMeal - a.idMeal);

  useEffect(() => {
    setMealsData(meals);
    if (meals.length === 0) {
      setIndex(0);
    } else if (index === 0) {
      setIndex(meals.length >= 20 ? 20 : meals.length);
    } else if (index > meals.length) {
      setIndex(meals.length);
    }
  }, [meals.length, categories]);

  useEffect(() => {
    switch (filter) {
      case 'new':
        setMealsData((prevMeals) =>
          [...prevMeals].sort((a, b) => b.idMeal - a.idMeal)
        );
        break;
      case 'asc':
        setMealsData((prevMeals) =>
          [...prevMeals].sort((a, b) => a.strMeal.localeCompare(b.strMeal))
        );
        break;
      case 'desc':
        setMealsData((prevMeals) =>
          [...prevMeals].sort((a, b) => b.strMeal.localeCompare(a.strMeal))
        );
        break;
      default:
        break;
    }
  }, [filter]);

  useEffect(() => {
    const isLoading = results.some((result) => result.isLoading);

    if (isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [results]);

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
