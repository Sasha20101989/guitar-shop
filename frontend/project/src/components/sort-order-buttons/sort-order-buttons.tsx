import { useCallback, useEffect } from "react";
import { SortingOrder } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { getSortingOrderMethod } from "../../store/main-process/main-process.selectors";
import { changeSortingOrder } from "../../store/main-process/main-process.slice";

function SortOrderButtons(): JSX.Element {
  const dispatch = useAppDispatch();

  const selectedOption = useAppSelector(getSortingOrderMethod) as SortingOrder;

  const onOptionSelect = useCallback((option: string) => {
    dispatch(changeSortingOrder(option));
  }, [dispatch]);

  return (
    <div className="catalog-sort__order">
      <button
        className={`catalog-sort__order-button catalog-sort__order-button--up ${
          selectedOption === SortingOrder.Asc ? 'catalog-sort__order-button--active' : ''
        }`}
        aria-label="По возрастанию"
        onClick={() => onOptionSelect(SortingOrder.Asc)}
      ></button>
      <button
        className={`catalog-sort__order-button catalog-sort__order-button--down ${
          selectedOption === SortingOrder.Desc ? 'catalog-sort__order-button--active' : ''
        }`}
        aria-label="По убыванию"
        onClick={() => onOptionSelect(SortingOrder.Desc)}
      ></button>
    </div>
  );
}

export default SortOrderButtons;
