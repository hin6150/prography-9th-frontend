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

export interface displayScreenType {
  meals: mealType[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  viewCount: number;
  isLoading: boolean;
}

export interface filterType {
  length: number;
  index: number;
  setViewCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface selectViewType {
  setViewCount: React.Dispatch<React.SetStateAction<number>>;
}
