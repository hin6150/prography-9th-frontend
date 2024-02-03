import { useQueries } from 'react-query';
import axios from 'axios';

export const useFetchMeals = (categories: string) => {
  const fetchMeal = async (category: string) => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    return response.data.meals;
  };

  const mealQueries = categories.split(',').map((category) => ({
    queryKey: ['meal', category],
    queryFn: () => fetchMeal(category),
    enabled: !!category,
  }));

  const results = useQueries(mealQueries);
  const isLoading = results.some((result) => result.isLoading);

  const meals = results
    .filter((result) => !result.isLoading && result.isSuccess)
    .flatMap((result) => result.data || [])
    .map((meal) => ({
      ...meal,
      strMeal: meal.strMeal.trimStart(), // strMeal 필드의 앞쪽 공백 제거
    }));

  return { meals, isLoading };
};
