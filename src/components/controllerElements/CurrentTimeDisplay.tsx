import React from 'react';
import styles from './index.less';

import { millisecondsToTime } from '../../utils/time';

type ComponentsProps = {
  currentTime: number;
  duration: number;
  spliter: string;
  style?: CSSStyleDeclaration;
};

export default (props: ComponentsProps) => {
  const { currentTime, duration, spliter = '/', style = {} } = props;

  return (
    <p className={styles.currentTime} style={style}>
      <span>{millisecondsToTime(currentTime)}</span>
      <span>{spliter}</span>
      <span>{millisecondsToTime(duration)}</span>
    </p>
  );
};
