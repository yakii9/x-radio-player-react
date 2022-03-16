import { number } from 'prop-types';
import React from 'react';

const isNaN: Function = Number.isNaN || ((value: number) => value !== value);

export function formatTime(seconds: number = 0, guide: number = seconds) {
  let s: number | string = Math.floor(seconds % 60);
  let m: number | string = Math.floor((seconds / 60) % 60);
  let h: number | string = Math.floor(seconds / 3600);
  const gm = Math.floor((guide / 60) % 60);
  const gh = Math.floor(guide / 3600);

  if (isNaN(seconds) || seconds === Infinity) {
    h = '-';
    m = '-';
    s = '-';
  }

  h = h > 0 || gh > 0 ? `${h}:` : '';

  m = `${(h || gm >= 10) && m < 10 ? `0${m}` : m}:`;

  s = s < 10 ? `0${s}` : s;

  return h + m + s;
}

export function isVideoChild(c: React.ReactElement<any>) {
  if (c.props && c.props.isVideoChild) {
    return true;
  }
  return c.type === 'source' || c.type === 'track';
}

const find = (elements: Array<any>, func: Function) => elements.filter(func)[0];

const isTypeEqual = (component1: React.ReactElement, component2: React.ReactElement) => {
  const type1: any = component1.type;
  const type2: any = component2.type;

  if (typeof type1 === 'string' || typeof type2 === 'string') {
    return type1 === type2;
  }

  if (typeof type1 === 'function' && typeof type2 === 'function') {
    return type1.displayName === type2.displayName;
  }

  return false;
};

export function mergeAndSortChildren(
  defaultChildren: Array<any>,
  _children: Array<any>,
  _parentProps: any,
  defaultOrder = 1
) {
  const children = React.Children.toArray(_children);
  const { order, ...parentProps } = _parentProps; // ignore order from parent
  return children
    .filter(e => !e.props.disabled) // filter the disabled components
    .concat(
      defaultChildren.filter(
        c => !find(children, component => isTypeEqual(component, c))
      )
    )
    .map((element) => {
      const defaultComponent = find(defaultChildren, c => isTypeEqual(c, element));

      const defaultProps = defaultComponent ? defaultComponent.props : {};
      const props = {
        ...parentProps, // inherit from parent component
        ...defaultProps, // inherit from default component
        ...element.props // element's own props
      };
      const e = React.cloneElement(element, props, element.props.children);
      return e;
    })
    .sort(
      (a, b) => (a.props.order || defaultOrder) - (b.props.order || defaultOrder)
    );
}

export function deprecatedWarning(oldMethodCall, newMethodCall) {
  // eslint-disable-next-line no-console
  console.warn(
    `WARNING: ${oldMethodCall} will be deprecated soon! Please use ${newMethodCall} instead.`
  );
}

export function throttle(callback: Function, limit: number) {
  let wait = false;
  return () => {
    if (!wait) {
      // eslint-disable-next-line prefer-rest-params
      callback(...arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

export const mediaProperties = [
  'error',
  'src',
  'srcObject',
  'currentSrc',
  'crossOrigin',
  'networkState',
  'preload',
  'buffered',
  'readyState',
  'seeking',
  'currentTime',
  'duration',
  'paused',
  'defaultPlaybackRate',
  'playbackRate',
  'played',
  'seekable',
  'ended',
  'autoplay',
  'loop',
  'mediaGroup',
  'controller',
  'controls',
  'volume',
  'muted',
  'defaultMuted',
  'audioTracks',
  'videoTracks',
  'textTracks',
  'width',
  'height',
  'videoWidth',
  'videoHeight',
  'poster'
];
