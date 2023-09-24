import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import { GuitarType } from "../../types/guitar-type";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { getStringFilters, getTypeFilters } from "../../store/main-process/main-process.selectors";
import { resetStringFilters, resetTypeFilters, toggleStringFilter, toggleTypeFilter } from "../../store/main-process/main-process.slice";
import { StringCount } from "../../types/string-count";

const guitarTypeLabels: Record<GuitarType, string> = {
  [GuitarType.Electric]: 'Электрогитары',
  [GuitarType.Acoustic]: 'Акустические гитары',
  [GuitarType.Ukulele]: 'Укулеле',
};

function FilterOptions(): JSX.Element {
  const dispatch = useAppDispatch();
  const initialStringFilters = useAppSelector(getStringFilters);
  const initialTypeFilters = useAppSelector(getTypeFilters);

  const handleClearFilters = () => {
    dispatch(resetStringFilters());
    dispatch(resetTypeFilters());
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name in initialStringFilters) {
      dispatch(toggleStringFilter(name as StringCount));
    } else if (name in initialTypeFilters) {
      dispatch(toggleTypeFilter(name as GuitarType));
    }
  };

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {Object.entries(initialTypeFilters).map(([type, isSelected]) => (
          <div key={type} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={type}
              name={type}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={type}>{guitarTypeLabels[type as GuitarType]}</label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {Object.entries(initialStringFilters).map(([stringCount, isSelected]) => (
          <div key={stringCount} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={stringCount}
              name={stringCount}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={stringCount}>{stringCount}</label>
          </div>
        ))}
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="button" onClick={handleClearFilters}>Очистить</button>
    </form>
  );
}

export default FilterOptions;
