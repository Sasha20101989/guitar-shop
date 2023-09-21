import { SortingOption, SortingOrder } from "../../const";

type SortTypeButtonsProps = {
  sortOptions: {
    sortBy: SortingOption;
    sortOrder: SortingOrder;
  };
  handleSortChange: (sortBy: SortingOption, sortOrder: SortingOrder) => void;
};

function SortTypeButtons({ sortOptions, handleSortChange }: SortTypeButtonsProps): JSX.Element {
  return (
    <div className="catalog-sort__type">
      <button
        className={`catalog-sort__type-button ${
          sortOptions.sortBy === SortingOption.Date ? 'catalog-sort__type-button--active' : ''
        }`}
        aria-label="по дате"
        onClick={() => handleSortChange(SortingOption.Date, sortOptions.sortOrder)}
      >
        по дате
      </button>
      <button
        className={`catalog-sort__type-button ${
          sortOptions.sortBy === SortingOption.Price ? 'catalog-sort__type-button--active' : ''
        }`}
        aria-label="по цене"
        onClick={() => handleSortChange(SortingOption.Price, sortOptions.sortOrder)}
      >
        по цене
      </button>
    </div>
  );
}

export default SortTypeButtons;
