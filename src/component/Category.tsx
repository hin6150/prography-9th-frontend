import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { categoryObjectType, categoryType } from '../type/type';
import {
  CategoryButton,
  CategoryContainer,
  SkeletonCategory,
} from './Component';

const Category = () => {
  const [categories, setCategories] = useState<categoryObjectType>({});
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category') || '';
  const currentCategoryArray = currentCategory.split(',');

  const { data, isLoading } = useQuery('category', () =>
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
  );

  // 객체로 카테고리 생성
  useEffect(() => {
    if (!isLoading && data) {
      const newCategories = data.data.categories.reduce(
        (acc: categoryObjectType, category: categoryType) => ({
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

  // 클릭 시, key에 해당하는 value값 수정, QueryString 업데이트
  const handleCategoryClick = (id: number) => {
    setCategories((prevCategories) => {
      const updatedCategories: categoryObjectType = {
        ...prevCategories,
        [id]: {
          ...prevCategories[id],
          isClicked: !prevCategories[id].isClicked,
        },
      };
      return updatedCategories;
    });

    const categoryToUpdate = categories[id].strCategory;

    if (currentCategoryArray.includes(categoryToUpdate)) {
      const index = currentCategoryArray.indexOf(categoryToUpdate);
      if (index > -1) {
        currentCategoryArray.splice(index, 1);
      }
    } else {
      currentCategoryArray.push(categoryToUpdate);
    }

    const queryString = currentCategoryArray.join(',');
    if (queryString !== '') {
      searchParams.set('category', queryString);
    } else {
      searchParams.delete('category');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <CategoryContainer>
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCategory key={index} />
          ))
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

export default Category;
