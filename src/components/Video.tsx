import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/video.less';

import { Spin } from 'antd';

import Controller from './ControllerBar';

import fullscreen from '../utils/fullscreen';

type ComponentsProps = {
  src: string;
  height?: number | string;
  width?: number | string;
  loadingTips?: string;
  timeSpliter?: string;
  actions?: Object;
  muted?: boolean;
  isShowController?: boolean;
};

export default (props: ComponentsProps) => {
  const {
    src,
    width,
    height,
    timeSpliter,
    muted = false,
    isShowController = true,
    actions = {},
    loadingTips = '视频加载中...',
  } = props;

  const videoRef = useRef(null);
  const videoOutBoxRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volumn, setVolumn] = useState(50);

  const setFullScreenStatus = () => {
    setIsFullScreen(fullscreen.isFullscreen);
  };

  useEffect(() => {
    fullscreen.addEventListener(setFullScreenStatus);
    muted && setVolumn(0);

    return () => {
      clearInterval(timer);
      fullscreen.removeEventListener(setFullScreenStatus);
    };
  }, []);

  const togglePlay = (e) => {
    e.preventDefault();
    if (!videoRef.current || isLoading) {
      return;
    }
    if (!isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handlePlay = (e: Event): void => {
    e.preventDefault();
    actions && actions.onPlay && actions.onPlay();
    setIsPlaying(true);
    setCurrentTime(videoRef.current.currentTime * 1000);
    const timer = setInterval(() => {
      actions && actions.onTimeUpdate && actions.onTimeUpdate();
      setCurrentTime(
        videoRef.current ? Math.ceil(videoRef.current.currentTime) * 1000 : 0,
      );
    }, 1000);
    setTimer(timer);
  };

  const handlePause = (e: Event): void => {
    e.preventDefault();
    actions && actions.onPause && actions.onPause();
    setIsPlaying(false);
    setCurrentTime(Math.ceil(videoRef.current.currentTime) * 1000);
    clearInterval(timer);
  };

  const handleEnded = (e: Event): void => {
    e.preventDefault();
    actions && actions.onEnded && actions.onEnded();
    setIsPlaying(false);
    clearInterval(timer);
    setCurrentTime(Math.ceil(videoRef.current.currentTime) * 1000);
  };

  const handleCanPlay = (e: Event): void => {
    e.preventDefault();
    actions && actions.onCanPlay && actions.onCanPlay();
    setIsLoading(false);
    setDuration(Math.ceil(videoRef.current.duration) * 1000);
  };

  const handleLoadedData = (e: Event): void => {
    e.preventDefault();
    actions && actions.onLoadedData && actions.onLoadedData();
    setIsLoading(false);
  };

  const handleFullScreen = (isFullScreen): void => {
    actions && actions.onFullScreen && actions.onFullScreen(isFullScreen);
    setIsFullScreen(isFullScreen);
  };

  const handleProgressChange = (value: number): void => {
    actions && actions.onProgressChange && actions.onProgressChange(value);
    if (videoRef.current && value > 0 && value < duration) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolumnChange = (value: number): void => {
    actions && actions.onVolumnChange && actions.onVolumnChange(value);
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
      setVolumn(value);
    }
  };

  return (
    <div
      className={styles['x-video-react-video']}
      ref={videoOutBoxRef}
      style={{
        width: isFullScreen ? '100vw' : '100%',
        height: isFullScreen ? '100vh' : '100%',
      }}
    >
      {!isLoading && isShowController && (
        <Controller
          togglePlay={togglePlay}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          isFullScreen={isFullScreen}
          volumn={volumn}
          spliter={timeSpliter}
          videoRef={videoOutBoxRef}
          handleFullScreen={handleFullScreen}
          onVolumeChange={handleVolumnChange}
          handleProgressChange={handleProgressChange}
        />
      )}
      {isLoading && (
        <div className={styles.loading}>
          <Spin tip={loadingTips} />
        </div>
      )}
      <div
        onClick={togglePlay}
        className={styles['x-video-box']}
        style={{
          visibility: isLoading ? 'hidden' : 'visible',
        }}
      >
        <video
          ref={videoRef}
          muted={muted}
          style={{
            maxWidth: isFullScreen ? '100vw' : '100%',
            maxHeight: isFullScreen ? '100vh' : '100%',
          }}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onCanPlay={handleCanPlay}
          onLoadedData={handleLoadedData}
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
