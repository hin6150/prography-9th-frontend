import React from 'react';
import { categories } from '../data/data';
import styled from 'styled-components';

const Category = () => {
  return (
    <CategoryContainer>
      {categories.map((category, index) => {
        return (
          <CategoryButton key={index}>{category.strCategory}</CategoryButton>
        );
      })}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  background-color: white;
  border-radius: 16px;
  border: 1px solid black;
`;

export default Category;
