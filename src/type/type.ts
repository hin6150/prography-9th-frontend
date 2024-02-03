export interface categoryType {
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
  isClicked: boolean;
}

export interface categoryObjectType {
  [key: string]: categoryType;
}

export interface mealType {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
}
