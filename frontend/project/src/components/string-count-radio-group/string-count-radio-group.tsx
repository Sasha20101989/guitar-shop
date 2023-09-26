import { Fragment } from 'react';
import { StringCount } from '../../types/string-count';

type StringCountRadioGroupProps = {
  selectedCount: string;
  onCountChange: (value: string) => void;
};

function StringCountRadioGroup({ selectedCount, onCountChange }: StringCountRadioGroupProps):JSX.Element {
  const stringCountOptions = Object.values(StringCount);

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    onCountChange(selectedValue);
  };

  return (
    <div className="input-radio edit-item__form-radio">
      <span>Количество струн</span>
      {stringCountOptions.map((count) => (
        <Fragment key={count}>
          <input
            type="radio"
            id={`string-qty-${count}`}
            name="string-qty"
            value={count}
            checked={selectedCount === count}
            onChange={handleCountChange}
          />
          <label className={`string-qty-${count}`} htmlFor={`string-qty-${count}`}>
            {count}
          </label>
        </Fragment>
      ))}
    </div>
  );
}

export default StringCountRadioGroup;
