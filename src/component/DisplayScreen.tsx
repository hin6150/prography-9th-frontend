import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { mealType } from '../data/data';

const DisplayScreen = ({
  meals,
  index,
  setIndex,
  viewCount,
}: {
  meals: mealType[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  viewCount: number;
}) => {
  const [displayMeals, setDisplayMeals] = useState(
    meals.slice(0, length > 20 ? 20 : length)
  );
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          meals.length >= index + 20
            ? setIndex((prev) => prev + 20)
            : setIndex(meals.length);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [meals.length, index]);

  useEffect(() => {
    const newDisplayMeals = meals.slice(0, index);
    setDisplayMeals(newDisplayMeals);
  }, [index, meals]);

  return (
    <DisplayScreenContainer $viewCount={viewCount}>
      {displayMeals.map((meal: mealType) => (
        <div key={meal.idMeal}>
          <MealImage
            loading='lazy'
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
          <p>{meal.strMeal}</p>
        </div>
      ))}
      <div ref={observerRef} />
    </DisplayScreenContainer>
  );
};

const DisplayScreenContainer = styled.div<{ $viewCount: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$viewCount}, 1fr)`};
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MealImage = styled.img`
  max-width: 100%;
  border-radius: 20px;

  @media (max-width: 1200px) {
    max-width: 100%;
    width: 100%;
  }
`;

export default DisplayScreen;
