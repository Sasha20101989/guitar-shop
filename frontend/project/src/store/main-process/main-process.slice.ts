import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MainState } from '../../types/state';
import { SortingOption, SortingOrder } from '../../const';
import { StringCount } from '../../types/string-count';
import { GuitarType } from '../../types/guitar-type';

const initialState: MainState = {
  sortingOrderMethod: SortingOrder.Asc,
  sortingMethod: SortingOption.Date,
  stringFilters: {
    [StringCount.Four]: false,
    [StringCount.Six]: false,
    [StringCount.Seven]: false,
    [StringCount.Twelve]: false,
  },
  typeFilters: {
    [GuitarType.Electric]: false,
    [GuitarType.Acoustic]: false,
    [GuitarType.Ukulele]: false,
  },
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
    },
    toggleStringFilter: (state, action: PayloadAction<StringCount>) => {
      state.stringFilters[action.payload] = !state.stringFilters[action.payload];
    },
    toggleTypeFilter: (state, action: PayloadAction<GuitarType>) => {
      state.typeFilters[action.payload] = !state.typeFilters[action.payload];
    },
    resetStringFilters: (state) => {
      state.stringFilters = initialState.stringFilters;
    },
    resetTypeFilters: (state) => {
      state.typeFilters = initialState.typeFilters;
    }
  },
});
export const { changeSortingOrder, changeSorting, toggleStringFilter, toggleTypeFilter, resetStringFilters, resetTypeFilters} = mainProcess.actions;
