import React from "react";

export interface PlayerProps {
  src: string;
}

const Player = (props: PlayerProps) => {
  return <div>{ props.src }</div>
};

export default Player;
