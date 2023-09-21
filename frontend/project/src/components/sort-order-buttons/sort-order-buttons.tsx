import { SortingOption, SortingOrder } from "../../const";

type SortOrderButtonsProps = {
  sortOptions: {
    sortBy: SortingOption;
    sortOrder: SortingOrder;
  };
  handleSortChange: (sortBy: SortingOption, sortOrder: SortingOrder) => void;
};

function SortOrderButtons({ sortOptions, handleSortChange }: SortOrderButtonsProps): JSX.Element {
  return (
    <div className="catalog-sort__order">
      <button
        className={`catalog-sort__order-button catalog-sort__order-button--up ${
          sortOptions.sortOrder === SortingOrder.Asc ? 'catalog-sort__order-button--active' : ''
        }`}
        aria-label="По возрастанию"
        onClick={() => handleSortChange(sortOptions.sortBy, SortingOrder.Asc)}
      ></button>
      <button
        className={`catalog-sort__order-button catalog-sort__order-button--down ${
          sortOptions.sortOrder === SortingOrder.Desc ? 'catalog-sort__order-button--active' : ''
        }`}
        aria-label="По убыванию"
        onClick={() => handleSortChange(sortOptions.sortBy, SortingOrder.Desc)}
      ></button>
    </div>
  );
}

export default SortOrderButtons;
