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

      const clickedCategories = Object.values(updatedCategories)
        .filter((c) => c.isClicked)
        .map((c) => c.strCategory);

      if (clickedCategories.length > 0) {
        const queryString = clickedCategories.join(',');

        searchParams.set('category', queryString);
        navigate(`${location.pathname}?${searchParams.toString()}`);
      } else {
        navigate('/');
      }

      return updatedCategories;
    });
  };
  if (isLoading) return null;
  return (
    <CategoryContainer>
      {Object.values(categories).map((category) => (
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
  gap: 4px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.div<{ $isClicked: boolean }>`
  padding: 8px 16px;
  background-color: ${(props) => (props.$isClicked ? 'skyblue' : 'white')};
  border-radius: 16px;
  border: 1px solid black;
`;

export default Category;
