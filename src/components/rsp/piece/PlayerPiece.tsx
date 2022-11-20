import RSPGamePlayer from "@models/rsp/RSPGamePlayer";
import { FunctionComponent } from "react";

export interface PlayerPieceProps {
  src: string;
  left: number;
  top: number;
}

const PlayerPiece: FunctionComponent<PlayerPieceProps> = (props) => {
  const { src, top, left } = props;

  return (
    <img
      className="absolute z-10 w-[5vw] h-[5vh] duration-1000 ease-in-out"
      src={src}
      alt=""
      style={{ left, top }}
    />
  );
};

export default PlayerPiece;
