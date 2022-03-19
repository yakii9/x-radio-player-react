import React, { Component } from 'react';
import classNames from 'classnames';

import './player.less';

import Video from '../Video';

type ComponentsProps = {
  src: string;
  height?: number;
  width?: number;
  isShowController?: boolean;
  muted?: boolean;
  loadingTips?: string;
};

export default class Player extends Component {
  constructor(props: ComponentsProps) {
    super(props);
  }

  render() {
    const {
      src,
      width = '100%',
      height = '100%',
      isShowController = true,
      muted = false,
      loadingTips = '视频加载中...',
    } = this.props;

    return (
      <div className={classNames('x-video-container')}>
        <Video
          src={src}
          height={height}
          width={width}
          isShowController={isShowController}
          muted={muted}
          loadingTips={loadingTips}
        />
      </div>
    );
  }
}
