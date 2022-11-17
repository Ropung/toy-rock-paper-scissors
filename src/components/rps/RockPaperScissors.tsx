import ResponsibleCircle from "@styles/svg/ResponsibleCircle";
import Ryan from "@assets/img/avatar/ryan.png";
import Prodo from "@assets/img/avatar/prodo.png";
import Muzi from "@assets/img/avatar/muzi.png";
import Apachi from "@assets/img/avatar/apeach.png";

import Rock from "@assets/img/rps/Rock.png";
import Scissors from "@assets/img/rps/scissors.png";
import Paper from "@assets/img/rps/paper.png";

import RPSGamePlayer from "@models/rps/RPSGamePlayer";
import { useEffect, useState } from "react";
import RockScissorsPaper from "@models/rps/RockScissorsPaper";

// l, r in ["묵", "찌", "빠"]
// const shoubu = (l: number, r: number) => ["비김", "L승", "R승"][(l + (3 - r)) % 3];

const RockPaperScissors = () => {
  const avatarMap = {
    "avatar://ryan.png": Ryan,
    "avatar://prodo.png": Prodo,
    "avatar://muzi.png": Muzi,
    "avatar://apeach.png": Apachi,
  };

  const rpsIconMap: { [key in RockScissorsPaper]: string } = {
    ROCK: Rock,
    SCISSORS: Scissors,
    PAPER: Paper,
  };

  // 함수로 만듦으로써 매번 생성하기 떄문에 다른 참조값을 가지게 됨.
  // rps, match 등 참조되는 자료(이 경우 배열)가 없었으면
  // { history: { ...initialHistoryState } } 등으로 초기화 가능
  const getInitialHistoryState = () => ({
    win: 0,
    lose: 0,
    draw: 0,
    rps: [],
    match: [],
  });

  const [player, setPlayer] = useState<RPSGamePlayer>({
    name: "나",
    rps: null,
    avatarUri: "avatar://ryan.png",
    history: getInitialHistoryState(),
  });

  const [counters, setCounters] = useState<RPSGamePlayer[]>([
    {
      name: "프로도",
      rps: null,
      avatarUri: "avatar://prodo.png",
      history: getInitialHistoryState(),
    },
    {
      name: "무지",
      rps: null,
      avatarUri: "avatar://muzi.png",
      history: getInitialHistoryState(),
    },
    {
      name: "어피치",
      rps: null,
      avatarUri: "avatar://apeach.png",
      history: getInitialHistoryState(),
    },
  ]);

  // 각 상황(게임 시작, 게임 종료, 냈을 때, 시간이 끝날 때 등)에 따라
  // 기존 Interval을 Clear해 주기 위해서.
  const [randomRPSAnimateInterval, setRandomRPSAnimateInterval] =
    useState<NodeJS.Timer | null>(null);

  // 기획상 승부에서 상대방이 찌가 많이나올수록 게임이 흥미로워짐
  // const random = Math.round(Math.random() * 2);
  useEffect(() => {
    // 단순 바꾸기
    const rpsSet: RockScissorsPaper[] = ["ROCK", "SCISSORS", "PAPER"];
    // == null로 하면 undefined를 포함하여 비교해 줌.(undefined 또는 null일 때 true)
    const random = Math.floor(Math.random() * 3); // 0, 1 ,2
    const rps = rpsSet[random];

    const newCounters = [...counters];
    newCounters[0].rps = rps;
    newCounters[1].rps = rps;
    newCounters[2].rps = rps;
    setCounters(newCounters);

    const interval = setInterval(() => {
      if (
        counters[0].rps == null ||
        counters[1].rps == null ||
        counters[2].rps == null
      ) {
        return;
      }

      const randoms = [0, 0, 0];
      randoms[0] = Math.floor(Math.random() * 2 + 1); // 1 , 2
      randoms[1] = Math.floor(Math.random() * 2 + 1); // 1 , 2
      randoms[2] = Math.floor(Math.random() * 2 + 1); // 1 , 2

      const currentIndexs: number[] = [0, 0, 0];
      currentIndexs[0] = rpsSet.indexOf(counters[0].rps);
      currentIndexs[1] = rpsSet.indexOf(counters[1].rps);
      currentIndexs[2] = rpsSet.indexOf(counters[2].rps);

      const newInexs: number[] = [0, 0, 0];
      newInexs[0] = (currentIndexs[0] + randoms[0]) % 3;
      newInexs[1] = (currentIndexs[1] + randoms[1]) % 3;
      newInexs[2] = (currentIndexs[2] + randoms[2]) % 3;

      const rpsMap: RockScissorsPaper[] = [];
      rpsMap[0] = rpsSet[newInexs[0]];
      rpsMap[1] = rpsSet[newInexs[1]];
      rpsMap[2] = rpsSet[newInexs[2]];

      const newCounters = [...counters];
      newCounters[0].rps = rpsMap[0];
      newCounters[1].rps = rpsMap[1];
      newCounters[2].rps = rpsMap[2];
      setCounters(newCounters);
    }, 500);

    setRandomRPSAnimateInterval(interval);

    return () => clearInterval(interval);
  }, []);

  return (
    <ul className="fixed right-0 left-0 bottom-0 items-end px-8 grid grid-cols-2 sm:grid-cols-4 py-4 gap-8 justify-items-center bg-main-contra">
      {/* 나 */}
      <li className="w-[20vw] h-[12vw] flex flex-row justify-between gap-4 border-main border-2 rounded-md p-2 px-6 bg-main text-main-contra">
        <div className="w-1/2 flex flex-col justify-between">
          <img
            className="w-full flex justify-center items-center"
            src={`${
              player.avatarUri.startsWith("avatar://")
                ? avatarMap[player.avatarUri as keyof typeof avatarMap]
                : player.avatarUri
            }`}
            alt=""
          />
          <p className="w-full text-center">{player.name}</p>
        </div>
        <div className="w-1/2 flex flex-col gap-10 justify-start">
          <img
            className="w-full"
            src={rpsIconMap[player.rps as RockScissorsPaper] ?? Rock}
            alt=""
          />
        </div>
      </li>

      {/* counters */}
      {counters.map((counter) => (
        <li className="w-[20vw] h-[12vw] flex flex-row justify-between gap-4 border-main border-2 rounded-md py-4 px-6 bg-main text-main-contra">
          <div className="w-1/2 flex flex-col justify-between">
            <img
              className="w-full flex justify-center items-center"
              src={
                counter.avatarUri.startsWith("avatar://")
                  ? avatarMap[counter.avatarUri as keyof typeof avatarMap]
                  : counter.avatarUri
              }
              alt=""
            />
            <p className="w-full text-center">{counter.name}</p>
          </div>
          <div className="w-1/2 flex flex-col gap-10 justify-start">
            <img
              className="w-full"
              src={rpsIconMap[counter.rps as RockScissorsPaper] ?? Rock}
              alt=""
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RockPaperScissors;
