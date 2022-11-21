import MatchResult from "./MatchResult";
import RockScissorsPaper from "./RockScissorsPaper";

export default interface RSPGamePlayer {
  username: string | null;
  name: string;
  // 프로젝트에 내장된 아바타를 사용하는 경우 avatar라고 하는 custom scheme을 사용(avatar:)
  avatarUri: string;
  rsp: RockScissorsPaper | null;
  boardIndex: number;
  history: {
    win: number;
    lose: number;
    draw: number;
    rsp: RockScissorsPaper[];
    match: MatchResult[];
  };
}
