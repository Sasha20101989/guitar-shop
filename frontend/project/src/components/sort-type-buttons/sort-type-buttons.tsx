import { useCallback } from 'react';
import { SortingOption } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getSortingMethod } from '../../store/main-process/main-process.selectors';
import { changeSorting } from '../../store/main-process/main-process.slice';

function SortTypeButtons(): JSX.Element {
  const dispatch = useAppDispatch();

  const selectedOption = useAppSelector(getSortingMethod) as SortingOption;

  const onOptionSelect = useCallback((option: string) => {
    dispatch(changeSorting(option));
  }, [dispatch]);

  return (
    <div className="catalog-sort__type">
      <button
        className={`catalog-sort__type-button ${
          selectedOption === SortingOption.Date ? 'catalog-sort__type-button--active' : ''
        }`}
        aria-label="по дате"
        onClick={() => onOptionSelect(SortingOption.Date)}
      >
        по дате
      </button>
      <button
        className={`catalog-sort__type-button ${
          selectedOption === SortingOption.Price ? 'catalog-sort__type-button--active' : ''
        }`}
        aria-label="по цене"
        onClick={() => onOptionSelect(SortingOption.Price)}
      >
        по цене
      </button>
    </div>
  );
}

export default SortTypeButtons;
