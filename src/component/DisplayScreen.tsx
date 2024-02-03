import React, { useEffect, useRef } from 'react';
import { mealType } from '../type/type';
import {
  DisplayScreenContainer,
  MealContainer,
  MealImage,
  SkeletonBox,
} from './Component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setIndex } from '../store/slice';

const DisplayScreen = ({ isLoading }: { isLoading: boolean }) => {
  const { index, mealsData, viewCount } = useSelector(
    (state: RootState) => state.slice
  );
  const dispatch = useDispatch();

  const observerRef = useRef(null);

  // Intersection Observer API를 통해 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          mealsData.length >= index + 20
            ? dispatch(setIndex(index + 20))
            : dispatch(setIndex(mealsData.length));
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
  }, [mealsData.length, index]);

  return (
    <>
      <DisplayScreenContainer $viewCount={viewCount}>
        {isLoading &&
          Array.from({ length: 20 }, (_, index) => <SkeletonBox key={index} />)}

        {mealsData.slice(0, index).map((meal: mealType) => (
          <MealContainer key={meal.idMeal} $viewCount={viewCount}>
            <MealImage
              loading='lazy'
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
            <p>{meal.strMeal}</p>
          </MealContainer>
        ))}
      </DisplayScreenContainer>
      <div ref={observerRef} style={{ height: '15vh' }} />
    </>
  );
};

export default DisplayScreen;
