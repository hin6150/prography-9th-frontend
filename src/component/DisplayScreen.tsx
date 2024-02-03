import React, { useEffect, useRef, useState } from 'react';
import { displayScreenType, mealType } from '../type/type';
import {
  DisplayScreenContainer,
  MealContainer,
  MealImage,
  SkeletonBox,
} from './Component';

const DisplayScreen = ({
  meals,
  index,
  setIndex,
  viewCount,
  isLoading,
}: displayScreenType) => {
  const [displayMeals, setDisplayMeals] = useState(
    meals.slice(0, length > 20 ? 20 : length)
  );
  const observerRef = useRef(null);

  // Intersection Observer API를 통해 무한 스크롤 구현
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

  // 일정 개수의 음식만 표기
  useEffect(() => {
    const newDisplayMeals = meals.slice(0, index);
    setDisplayMeals(newDisplayMeals);
  }, [index, meals]);

  return (
    <DisplayScreenContainer $viewCount={viewCount}>
      {isLoading &&
        Array.from({ length: 20 }, (_, index) => <SkeletonBox key={index} />)}

      {displayMeals.map((meal: mealType) => (
        <MealContainer key={meal.idMeal} $viewCount={viewCount}>
          <MealImage
            loading='lazy'
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
          <p>{meal.strMeal}</p>
        </MealContainer>
      ))}

      <div ref={observerRef} style={{ height: 200 }} />
    </DisplayScreenContainer>
  );
};

export default DisplayScreen;
