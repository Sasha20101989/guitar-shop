import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MainState } from '../../types/state';
import { SortingOption, SortingOrder } from '../../const';

const initialState: MainState = {
  sortingOrderMethod: SortingOrder.Asc,
  sortingMethod: SortingOption.Date,
};

export const mainProcess = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    changeSortingOrder: (state, action: PayloadAction<string>) => {
      state.sortingOrderMethod = action.payload;
    },
    changeSorting: (state, action: PayloadAction<string>) => {
      state.sortingMethod = action.payload;
    }
  },
});
export const { changeSortingOrder, changeSorting } = mainProcess.actions;
