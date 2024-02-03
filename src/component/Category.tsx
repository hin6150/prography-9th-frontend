import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { categoryType } from '../data/data';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState<{ [key: string]: categoryType }>(
    {}
  );
  const navigate = useNavigate();

  const { data, isLoading } = useQuery('category', () =>
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
  );

  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category') || '';
  const currentCategoryArray = currentCategory.split(',');

  useEffect(() => {
    if (!isLoading && data) {
      const newCategories = data.data.categories.reduce(
        (acc: { [key: string]: categoryType }, category: categoryType) => ({
          ...acc,
          [category.idCategory]: {
            ...category,
            isClicked: currentCategoryArray.includes(category.strCategory),
          },
        }),
        {}
      );
      setCategories(newCategories);
    }
  }, [data, isLoading]);

  const handleCategoryClick = (id: number) => {
    setCategories((prevCategories) => {
      const updatedCategories: { [key: string]: categoryType } = {
        ...prevCategories,
        [id]: {
          ...prevCategories[id],
          isClicked: !prevCategories[id].isClicked,
        },
      };
      return updatedCategories;
    });
  };

  useEffect(() => {
    const clickedCategories = Object.values(categories)
      .filter((c) => c.isClicked)
      .map((c) => c.strCategory);

    if (clickedCategories.length > 0) {
      const queryString = clickedCategories.join(',');
      searchParams.set('category', queryString);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      navigate('/');
    }
  }, [categories, navigate, location.pathname]);

  return (
    <CategoryContainer>
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} />)
        : Object.values(categories).map((category) => (
            <CategoryButton
              key={category.idCategory}
              onClick={() => handleCategoryClick(category.idCategory)}
              $isClicked={category.isClicked}
            >
              {category.strCategory}
            </CategoryButton>
          ))}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.div<{ $isClicked: boolean }>`
  padding: 8px 16px;
  background-color: ${(props) => (props.$isClicked ? '#cae0f9' : 'white')};
  border-radius: 16px;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.2),
    0px 2px 4px -1px rgba(0, 0, 0, 0.12);

  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.12);
  }
`;

const Skeleton = styled.div`
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid #ddd;
  width: 100px;
  height: 20px;

  animation: skeletonShine 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;

  @keyframes skeletonShine {
    0% {
      background-position: -200px;
    }
    100% {
      background-position: calc(100% + 200px);
    }
  }
`;

export default Category;
