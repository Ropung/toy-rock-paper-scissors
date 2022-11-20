import RSPGamePlayer from "./RSPGamePlayer";

export default interface RPSPianoKey {
  maxSeat: number;
  basePosition: {
    left: string;
    top: string;
  };
  playerList: RSPGamePlayer[];
}
