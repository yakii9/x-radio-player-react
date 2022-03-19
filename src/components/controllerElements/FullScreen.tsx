import React from 'react';

import styles from './index.less';

import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

import fullscreen from '../../utils/fullscreen';

type ComponentsProps = {
  onFullScreen?: Function;
  isFullScreen?: boolean;
  style?: React.CSSProperties;
  videoRef?: React.RefObject<HTMLVideoElement>;
};

export default (props: ComponentsProps) => {
  const {
    style = {},
    isFullScreen = false,
    videoRef = React.createRef<HTMLVideoElement>(),
    onFullScreen = () => {},
  } = props;

  const toggleFullScreen = () => {
    if (fullscreen.enabled) {
      !fullscreen.isFullscreen && fullscreen.request(videoRef.current);
      fullscreen.isFullscreen && fullscreen.exit();
      onFullScreen && onFullScreen(Boolean(!fullscreen.isFullscreen));
    }
  };

  return (
    <div className={styles.fullscreen} style={style}>
      {!isFullScreen && (
        <FullscreenOutlined
          className={styles.button}
          onClick={toggleFullScreen}
        />
      )}
      {isFullScreen && (
        <FullscreenExitOutlined
          className={styles.button}
          onClick={toggleFullScreen}
        />
      )}
    </div>
  );
};
