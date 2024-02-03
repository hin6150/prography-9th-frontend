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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categories = queryParams.get('category') || '';

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

  const mealData: mealType[] = results
    .filter((result) => !result.isLoading && result.isSuccess)
    .flatMap((result) => result.data || []);

  useEffect(() => {
    if (index === 0) {
      mealData.length >= 20 ? setIndex(20) : setIndex(mealData.length);
      return;
    }
    if (mealData.length === 0) {
      setIndex(0);
      return;
    }
  }, [mealData.length]);

  return (
    <Inner>
      <Header />
      <Category />
      <Filter
        length={mealData.length}
        index={index}
        setViewCount={setViewCount}
      />
      <DisplayScreen
        meals={mealData}
        setIndex={setIndex}
        index={index}
        viewCount={viewCount}
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

  @media (max-width: 1200px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

export default App;
