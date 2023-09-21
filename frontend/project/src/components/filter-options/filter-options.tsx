import { useEffect, useState } from "react";
import { StringCount } from "../../types/string-count";
import { Product } from "../../types/product";
import { GuitarType } from "../../types/guitar-type";

type FilterOptionsProps = {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

const guitarTypeLabels: Record<GuitarType, string> = {
  [GuitarType.Electric]: 'Электрогитары',
  [GuitarType.Acoustic]: 'Акустические гитары',
  [GuitarType.Ukulele]: 'Укулеле',
};

function FilterOptions({ products, onFilterChange }: FilterOptionsProps): JSX.Element {
  const initialStringFilters: Record<StringCount, boolean> ={
    [StringCount.Four]: false,
    [StringCount.Six]: false,
    [StringCount.Seven]: false,
    [StringCount.Twelve]: false,
  };

  const initialTypeFilters: Record<GuitarType, boolean> = {
    [GuitarType.Electric]: false,
    [GuitarType.Acoustic]: false,
    [GuitarType.Ukulele]: false,
  };

  const [stringFilters, setStringFilters] = useState(initialStringFilters);
  const [typeFilters, setTypeFilters] = useState(initialTypeFilters);

  const handleClearFilters = () => {
    setStringFilters(initialStringFilters);
    setTypeFilters(initialTypeFilters);
    onFilterChange(products);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name in stringFilters) {
      setStringFilters({ ...stringFilters, [name]: checked });
    } else if (name in typeFilters) {
      setTypeFilters({ ...typeFilters, [name]: checked });
    }
  };

  const handleFilterChange = () => {
    const filteredProducts = products.filter((product) => {
      const stringCountFilter = Object.entries(stringFilters).some(([stringCount, isSelected]) => {
        if (isSelected && product.numberOfStrings === stringCount) {
          return true;
        }
        return false;
      });

      const typeFilter = Object.entries(typeFilters).some(([type, isSelected]) => {
        if (isSelected && product.type === type) {
          return true;
        }
        return false;
      });

      if (stringCountFilter || typeFilter) {
        return true;
      }

      return false;
    });

    if (Object.values(stringFilters).some((isSelected) => isSelected) || 
      Object.values(typeFilters).some((isSelected) => isSelected)) {
      onFilterChange(filteredProducts);
    } else {
      onFilterChange(products);
    }
  };

  useEffect(() => {
    handleFilterChange();
  }, [stringFilters, typeFilters]);

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {Object.entries(typeFilters).map(([type, isSelected]) => (
          <div key={type} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={type}
              name={type}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={type}>{guitarTypeLabels[type as GuitarType]}</label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {Object.entries(stringFilters).map(([stringCount, isSelected]) => (
          <div key={stringCount} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={stringCount}
              name={stringCount}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={stringCount}>{stringCount}</label>
          </div>
        ))}
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="button" onClick={handleClearFilters}>Очистить</button>
    </form>
  );
}

export default FilterOptions;
