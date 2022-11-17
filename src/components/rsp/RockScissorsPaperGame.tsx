import Ryan from "@assets/img/avatar/ryan.png";
import Prodo from "@assets/img/avatar/prodo.png";
import Muzi from "@assets/img/avatar/muzi.png";
import Apachi from "@assets/img/avatar/apeach.png";

import Rock from "@assets/img/rsp/Rock.png";
import Scissors from "@assets/img/rsp/scissors.png";
import Paper from "@assets/img/rsp/paper.png";
import RandomRSP from "@assets/img/rsp/random_rsp.png";

import RSPGamePlayer from "@models/rsp/RSPGamePlayer";
import { useEffect, useState } from "react";
import RockScissorsPaper from "@models/rsp/RockScissorsPaper";

import SelectRSPModal from "./modal/SelectRSPModal";

// l, r in ["묵", "찌", "빠"]
// const shoubu = (l: number, r: number) => ["비김", "L승", "R승"][(l + (3 - r)) % 3];

const RockScissorsPaperGame = () => {
  const avatarMap = {
    "avatar://ryan.png": Ryan,
    "avatar://prodo.png": Prodo,
    "avatar://muzi.png": Muzi,
    "avatar://apeach.png": Apachi,
  };

  const rspIconMap: { [key in RockScissorsPaper]: string } = {
    ROCK: Rock,
    SCISSORS: Scissors,
    PAPER: Paper,
  };

  // 함수로 만듦으로써 매번 생성하기 떄문에 다른 참조값을 가지게 됨.
  // rsp, match 등 참조되는 자료(이 경우 배열)가 없었으면
  // { history: { ...initialHistoryState } } 등으로 초기화 가능
  const getInitialHistoryState = () => ({
    win: 0,
    lose: 0,
    draw: 0,
    rsp: [],
    match: [],
  });

  const [player, setPlayer] = useState<RSPGamePlayer>({
    userid: 0,
    name: "나",
    rsp: null,
    avatarUri: "avatar://ryan.png",
    history: getInitialHistoryState(),
  });

  const [counters, setCounters] = useState<RSPGamePlayer[]>([
    {
      userid: 1,
      name: "프로도",
      rsp: null,
      avatarUri: "avatar://prodo.png",
      history: getInitialHistoryState(),
    },
    {
      userid: 2,
      name: "무지",
      rsp: null,
      avatarUri: "avatar://muzi.png",
      history: getInitialHistoryState(),
    },
    {
      userid: 3,
      name: "어피치",
      rsp: null,
      avatarUri: "avatar://apeach.png",
      history: getInitialHistoryState(),
    },
  ]);

  // 플레이어 가위바위보 모달선택창
  const [isSelectOpen, setSelectOpen] = useState<boolean>(false);

  // 플레이어 가위바위보 모달창 선택 상태관리
  const [rspSelect, setRspSelect] = useState<RockScissorsPaper | null>(null);

  // 각 상황(게임 시작, 게임 종료, 냈을 때, 시간이 끝날 때 등)에 따라
  // 기존 Interval을 Clear해 주기 위해서.
  const [randomRSPAnimateInterval, setRandomRSPAnimateInterval] =
    useState<NodeJS.Timer | null>(null);

  // 플레이어 RSP 상태관리
  useEffect(() => {
    const newPlayer = { ...player };
    newPlayer.rsp = rspSelect;
    setPlayer(newPlayer);
  }, [rspSelect]);

  useEffect(() => {
    // 초기값 넣어서 기본값넣기
    const rspSet: RockScissorsPaper[] = ["ROCK", "SCISSORS", "PAPER"];
    // == null로 하면 undefined를 포함하여 비교해 줌.(undefined 또는 null일 때 true)
    const random = Math.floor(Math.random() * 3); // 0, 1 ,2
    const rsp = rspSet[random];

    const newCounters = [...counters];
    newCounters[0].rsp = rsp;
    newCounters[1].rsp = rsp;
    newCounters[2].rsp = rsp;
    setCounters(newCounters);

    const interval = setInterval(() => {
      if (
        counters[0].rsp == null ||
        counters[1].rsp == null ||
        counters[2].rsp == null
      ) {
        return;
      }

      const randoms = [0, 0, 0];
      //  1, 2
      randoms[0] = Math.floor(Math.random() * 2 + 1);
      randoms[1] = Math.floor(Math.random() * 2 + 1);
      randoms[2] = Math.floor(Math.random() * 2 + 1);

      const currentIndexs: number[] = [0, 0, 0];
      currentIndexs[0] = rspSet.indexOf(counters[0].rsp);
      currentIndexs[1] = rspSet.indexOf(counters[1].rsp);
      currentIndexs[2] = rspSet.indexOf(counters[2].rsp);

      const newIndexs: number[] = [0, 0, 0];
      newIndexs[0] = (currentIndexs[0] + randoms[0]) % 3;
      newIndexs[1] = (currentIndexs[1] + randoms[1]) % 3;
      newIndexs[2] = (currentIndexs[2] + randoms[2]) % 3;

      const rspMap: RockScissorsPaper[] = [];
      rspMap[0] = rspSet[newIndexs[0]];
      rspMap[1] = rspSet[newIndexs[1]];
      rspMap[2] = rspSet[newIndexs[2]];

      const newCounters = [...counters];
      newCounters[0].rsp = rspMap[0];
      newCounters[1].rsp = rspMap[1];
      newCounters[2].rsp = rspMap[2];
      setCounters(newCounters);
    }, 200);

    setRandomRSPAnimateInterval(interval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-0 left-0 bottom-0 min-h-fit bg-main-contra border-t-2 border-black">
      <ul className="grid jm:grid-cols-2 grid-cols-4 px-4 py-4 gap-4 justify-items-center">
        {/* 게임진행을 위한 모달창 */}
        {isSelectOpen && (
          <SelectRSPModal
            rspSelect={rspSelect}
            setRspSelect={setRspSelect}
            isSelectOpen={isSelectOpen}
            setSelectOpen={setSelectOpen}
          />
        )}

        {/* 나 */}
        <li className="min-h-fit flex flex-col justify-between border-main border-2 rounded-md py-4 px-6 bg-main text-main-contra">
          <div className="w-1/2 flex justify-between gap-2">
            <img
              className="flex justify-center items-center"
              src={`${
                player.avatarUri.startsWith("avatar://")
                  ? avatarMap[player.avatarUri as keyof typeof avatarMap]
                  : player.avatarUri
              }`}
              alt=""
            />
            <img
              className="flex justify-center items-center"
              onClick={() => {
                setSelectOpen(!isSelectOpen);
                setRspSelect(null);
              }}
              src={rspIconMap[player.rsp as RockScissorsPaper] ?? RandomRSP}
              alt=""
            />
          </div>
          <p className="w-full flex justify-center items-center text-xl font-bold">
            {player.name}
          </p>
          <div className="w-full flex flex-row justify-center gap-2">
            <img className="w-1/3" src={Rock} alt="" />
            <img className="w-1/3" src={Rock} alt="" />
            <img className="w-1/3" src={Rock} alt="" />
          </div>
        </li>

        {/* counters */}
        {counters.map((counter) => (
          <li
            key={counter.userid}
            className="min-h-fit flex flex-col justify-between border-main border-2 rounded-md py-4 px-6 bg-main text-main-contra"
          >
            <div className="w-full flex justify-between gap-2">
              <img
                className="w-1/2 flex justify-center"
                src={
                  counter.avatarUri.startsWith("avatar://")
                    ? avatarMap[counter.avatarUri as keyof typeof avatarMap]
                    : counter.avatarUri
                }
                alt=""
              />
              <img
                className="w-1/2 flex justify-center items-center"
                src={rspIconMap[counter.rsp as RockScissorsPaper] ?? RandomRSP}
                alt=""
              />
            </div>
            <p className="w-full flex justify-center items-center text-xl font-bold">
              {counter.name}
            </p>
            <div className="w-full flex flex-row gap-2 justify-between items-center">
              <img className="w-1/3" src={Rock} alt="" />
              <img className="w-1/3" src={Rock} alt="" />
              <img className="w-1/3" src={Rock} alt="" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RockScissorsPaperGame;
