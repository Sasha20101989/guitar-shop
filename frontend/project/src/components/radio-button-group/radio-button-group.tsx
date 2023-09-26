import { Fragment } from 'react';
import { GuitarType } from '../../types/guitar-type';

type RadioButtonGroupProps = {
  selectedType: string;
  onTypeChange: (value: string) => void;
};

function RadioButtonGroup({ selectedType, onTypeChange }: RadioButtonGroupProps): JSX.Element {
  const radioOptions = Object.values(GuitarType);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    onTypeChange(selectedValue);
  };

  return (
    <div className="input-radio edit-item__form-radio">
      <span>Тип товара</span>
      {radioOptions.map((type) => (
        <Fragment key={type}>
          <input
            type="radio"
            id={`type-${type}`}
            name="item-type"
            value={type}
            checked={selectedType === type}
            onChange={handleTypeChange}
          />
          <label htmlFor={`type-${type}`}>{type}</label>
        </Fragment>
      ))}
    </div>
  );
}

export default RadioButtonGroup;
