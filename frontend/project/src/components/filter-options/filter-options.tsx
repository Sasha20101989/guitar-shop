import FilterBlock from "../filter-block/filter-block";
import FilterCheckbox from "../filter-checkbox/filter-checkbox";

function FilterOptions(): JSX.Element {
  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterBlock title="Тип гитар">
        <FilterCheckbox id="acoustic" name="acoustic" label="Акустические гитары"/>
        <FilterCheckbox id="electric" name="electric" label="Электрогитары" checked={true}/>
        <FilterCheckbox id="ukulele" name="ukulele" label="Укулеле" checked={true}/>
      </FilterBlock>
      <FilterBlock title="Количество струн">
        <FilterCheckbox id="4-strings" name="4-strings" label="4" checked={true} />
        <FilterCheckbox id="6-strings" name="6-strings" label="6" checked={true}/>
        <FilterCheckbox id="7-strings" name="7-strings" label="7"/>
        <FilterCheckbox id="12-strings" name="12-strings" label="12" disabled={true} />
      </FilterBlock>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default FilterOptions;
