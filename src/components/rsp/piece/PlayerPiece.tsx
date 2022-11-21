import RSPGamePlayer from "@models/rsp/RSPGamePlayer";
import { FunctionComponent } from "react";

export interface PlayerPieceProps {
  src: string;
  left: string;
  top: string;
}

const PlayerPiece: FunctionComponent<PlayerPieceProps> = (props) => {
  const { src, top, left } = props;

  return (
    <img
      className="absolute z-10 w-[5vw] h-[5vh] duration-1000 ease-in-out -translate-x-1/2 -translate-y-1/2"
      src={src}
      alt=""
      style={{ left, top }}
    />
  );
};

export default PlayerPiece;
