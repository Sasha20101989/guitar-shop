import { SortingOption, SortingOrder } from "../../const";
import SortOrderButtons from "../sort-order-buttons/sort-order-buttons";
import SortTypeButtons from "../sort-type-buttons/sort-type-buttons";

function SortingOptions({
  sortOptions,
  setSortOptions,
}: {
  sortOptions: {
    sortBy: SortingOption;
    sortOrder: SortingOrder;
  };
  setSortOptions: React.Dispatch<React.SetStateAction<{ sortBy: SortingOption; sortOrder: SortingOrder }>>;
}): JSX.Element {
  const handleSortChange = (sortBy: SortingOption, sortOrder: SortingOrder) => {
    setSortOptions({ sortBy, sortOrder });
  };
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <SortTypeButtons sortOptions={sortOptions} handleSortChange={handleSortChange} />
      <SortOrderButtons sortOptions={sortOptions} handleSortChange={handleSortChange} />
    </div>
  );
}

export default SortingOptions;
