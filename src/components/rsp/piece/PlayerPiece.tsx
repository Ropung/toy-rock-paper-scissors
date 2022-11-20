import RSPGamePlayer from "@models/rsp/RSPGamePlayer";
import { FunctionComponent } from "react";

export interface PlayerPieceProps {
  player: RSPGamePlayer;
  src: string;
  left: number;
  top: number;
}

const PlayerPiece: FunctionComponent<PlayerPieceProps> = (props) => {
  const { player, src, top, left } = props;

  return (
    <img
      className="absolute w-[5vw] h-[5vh] duration-1000 ease-in-out"
      src={src}
      alt=""
      style={{ left, top }}
    />
  );
};

export default PlayerPiece;
