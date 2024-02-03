import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { mealType } from '../data/data';

const DisplayScreen = ({
  meals,
  index,
  setIndex,
  viewCount,
  isLoading,
}: {
  meals: mealType[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  viewCount: number;
  isLoading: boolean;
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
      {isLoading &&
        Array.from({ length: 20 }, (_, index) => <SkeletonBox key={index} />)}

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

      <div ref={observerRef} style={{ height: 200 }} />
    </DisplayScreenContainer>
  );
};

const DisplayScreenContainer = styled.div<{ $viewCount: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$viewCount}, 1fr)`};
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SkeletonBox = styled.div`
  width: 100%;
  height: 276px;
  background-color: #eee;
  border-radius: 8px;
`;

const MealImage = styled.img`
  width: 100%;
  border-radius: 24px;
`;

export default DisplayScreen;
