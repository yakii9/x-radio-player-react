import React from 'react';
import styles from '../styles/controller.less';

import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

import CurrentTimeDisplay from './controllerElements/CurrentTimeDisplay';
import ProgressBar from './controllerElements/PlyaingProgressBar';
import FullScreenButton from './controllerElements/FullScreen';
import VolumeBar from './controllerElements/VolumnBar';

type ComponentsProps = {
  children?: any;
  isFullScreen?: boolean;
  isPlaying?: boolean;
  classNmae?: string;
  currentTime?: number;
  duration?: number;
  volumn?: number;
  spliter?: string;
  handleProgressChange?: (value: number) => void;
  handleFullScreen?: Function;
  videoRef?: React.RefObject<HTMLVideoElement>;
  onVolumeChange?: (value: number) => void;
  togglePlay: Function;
};

export default (props: ComponentsProps) => {
  const {
    children,
    isFullScreen,
    isPlaying,
    classNmae,
    currentTime,
    duration,
    spliter,
    volumn,
    videoRef,
    handleProgressChange: handleChangeProgress,
    handleFullScreen = () => {},
    onVolumeChange = () => {},
    togglePlay = () => {},
  } = props;

  return (
    <div
      style={{
        position: isFullScreen ? 'fixed' : 'absolute',
      }}
      className={styles.controller}
    >
      <ProgressBar
        onChange={handleChangeProgress}
        max={Math.ceil(duration / 1000)}
        min={0}
        value={Math.ceil(currentTime / 1000)}
      />
      <div className={styles.buttonsBar}>
        <div className={styles.controller_left}>
          {!isPlaying && (
            <CaretRightOutlined
              className={styles.button}
              onClick={togglePlay}
            />
          )}
          {isPlaying && (
            <PauseOutlined className={styles.button} onClick={togglePlay} />
          )}
          <CurrentTimeDisplay
            currentTime={currentTime}
            duration={duration}
            spliter={spliter}
          ></CurrentTimeDisplay>
        </div>
        <div className={styles.controller_right}>
          <VolumeBar
            volume={volumn}
            max={100}
            min={0}
            step={1}
            onVolumeChange={onVolumeChange}
          />
          <FullScreenButton
            isFullScreen={isFullScreen}
            videoRef={videoRef}
            onFullScreen={handleFullScreen}
          ></FullScreenButton>
        </div>
      </div>
    </div>
  );
};
