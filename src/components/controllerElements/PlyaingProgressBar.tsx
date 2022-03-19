import React, { useState, useEffect } from 'react';
import styles from './index.less';

type ComponentsProps = {
  max: number;
  min: number;
  value: number;
  step: number;
  onChange: (value: number) => void;
};

export default (props: ComponentsProps) => {
  const { max, min, value, step = 1, onChange = () => {} } = props;

  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = e.target;
    onChange(Number(newValue));
  };

  const handleInput = (e: Event) => {
    setInnerValue(e.target.value);
  };

  return (
    <div className={styles['progress-bar']}>
      <input
        style={{
          backgroundSize: `${((innerValue - min) / (max - min)) * 100}% 100%`,
        }}
        type="range"
        min={min}
        max={max}
        step={step}
        value={innerValue}
        onChange={handleChange}
        onInput={handleInput}
      />
    </div>
  );
};
