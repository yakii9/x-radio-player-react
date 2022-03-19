import React from 'react';
import styles from './index.less';

import { SoundFilled } from '@ant-design/icons';

type ComponentsProps = {
  volume: number;
  max: number;
  min: number;
  step: number;
  onVolumeChange: (volume: number) => void;
};

export default (props: ComponentsProps) => {
  const { volume, max, min, step = 1, onVolumeChange = () => {} } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = e.target;
    onVolumeChange(Number(newValue));
  };

  const handleInput = (e: Event) => {
    const { value: newValue } = e.target;
    onVolumeChange(Number(newValue));
  };

  return (
    <div className={styles.volumeBar}>
      <input
        style={{
          backgroundSize: `${((volume - min) / (max - min)) * 100}% 100%`,
        }}
        type="range"
        min={min}
        max={max}
        step={step}
        value={volume}
        onChange={handleChange}
        onInput={handleInput}
      />
      <SoundFilled className={styles.button} />
    </div>
  );
};
