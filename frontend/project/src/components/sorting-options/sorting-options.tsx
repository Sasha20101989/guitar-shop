import SortOrderButtons from '../sort-order-buttons/sort-order-buttons';
import SortTypeButtons from '../sort-type-buttons/sort-type-buttons';

function SortingOptions(): JSX.Element {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <SortTypeButtons/>
      <SortOrderButtons/>
    </div>
  );
}

export default SortingOptions;
