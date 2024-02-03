import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { mealType } from '../type/type';

interface SliceState {
  index: number;
  viewCount: number;
  mealsData: mealType[];
  isLoading: boolean;
}

const initialState: SliceState = {
  index: 0,
  viewCount: 4,
  mealsData: [],
  isLoading: false,
};

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setViewCount: (state, action: PayloadAction<number>) => {
      state.viewCount = action.payload;
    },
    setMealsData: (state, action: PayloadAction<mealType[]>) => {
      state.mealsData = action.payload;
    },
    sortMeals: (state, action: PayloadAction<string>) => {
      state.mealsData.sort((a, b) => {
        switch (action.payload) {
          case 'new':
            return b.idMeal - a.idMeal;
          case 'asc':
            return a.strMeal.localeCompare(b.strMeal);
          case 'desc':
            return b.strMeal.localeCompare(a.strMeal);
          default:
            return b.idMeal - a.idMeal;
        }
      });
    },
  },
});

export const { setIndex, setViewCount, setMealsData, sortMeals } =
  slice.actions;

export default slice.reducer;
