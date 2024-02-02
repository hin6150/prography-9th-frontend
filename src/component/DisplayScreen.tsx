import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useQueries } from 'react-query';
import { mealType } from '../data/data';

const DisplayScreen = () => {
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

  return (
    <DisplayScreenContainer>
      {mealData?.map((meal: mealType) => {
        return (
          <div key={meal.idMeal}>
            <MealImage src={meal.strMealThumb}></MealImage>
            <p>{meal.strMeal}</p>
          </div>
        );
      })}
    </DisplayScreenContainer>
  );
};

const DisplayScreenContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MealImage = styled.img`
  max-width: 276px;
  border-radius: 20px;

  @media (max-width: 1200px) {
    max-width: 100%;
    width: 100%;
  }
`;

export default DisplayScreen;
