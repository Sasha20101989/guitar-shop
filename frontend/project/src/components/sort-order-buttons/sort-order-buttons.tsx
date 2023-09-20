function SortOrderButtons(): JSX.Element {
  return (
    <div className="catalog-sort__order">
      <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
      <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию"></button>
    </div>
  );
}
export default SortOrderButtons;
