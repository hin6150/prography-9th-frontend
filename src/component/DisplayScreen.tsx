import React from 'react';
import styled from 'styled-components';
import { meals } from '../data/data';

const DisplayScreen = () => {
  return (
    <DisplayScreenContainer>
      {meals.map((meal, index) => {
        return (
          <div key={index}>
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
