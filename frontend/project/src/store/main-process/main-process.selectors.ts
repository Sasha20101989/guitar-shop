import { NameSpace, SortingOption } from '../../const';
import { GuitarType } from '../../types/guitar-type';
import { State } from '../../types/state';
import { StringCount } from '../../types/string-count';

export const getSortingMethod = (state: State): string => state[NameSpace.Main].sortingMethod;
export const getSortingOrderMethod = (state: State): string => state[NameSpace.Main].sortingOrderMethod;
export const getStringFilters = (state: State): Record<StringCount, boolean> => state[NameSpace.Main].stringFilters;
export const getTypeFilters = (state: State): Record<GuitarType, boolean> => state[NameSpace.Main].typeFilters;
