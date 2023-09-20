function SortTypeButtons(): JSX.Element {
  return (
    <div className="catalog-sort__type">
      <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по дате">
        по дате
      </button>
      <button className="catalog-sort__type-button" aria-label="по цене">
        по цене
      </button>
    </div>
  );
}
export default SortTypeButtons;
