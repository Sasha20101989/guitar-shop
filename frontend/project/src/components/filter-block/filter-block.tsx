type FilterBlockProps = {
  title: string;
  children: React.ReactNode;
}

function FilterBlock({ title, children }: FilterBlockProps): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">{title}</legend>
      {children}
    </fieldset>
  );
}

export default FilterBlock;
