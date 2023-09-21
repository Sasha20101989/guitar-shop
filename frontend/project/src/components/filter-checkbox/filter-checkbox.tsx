type FilterCheckboxProps = {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  disabled: boolean;
}

function FilterCheckbox({ id, name, label, checked = false, disabled = false }: FilterCheckboxProps): JSX.Element {
  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input className="visually-hidden" type="checkbox" id={id} name={name}/>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default FilterCheckbox;
