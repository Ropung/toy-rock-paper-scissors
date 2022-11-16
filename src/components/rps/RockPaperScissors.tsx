import ResponsibleCircle from "@styles/svg/ResponsibleCircle";
import Ryan from "@assets/img/avatar/ryan.png";
import Prodo from "@assets/img/avatar/prodo.png";
import Muzi from "@assets/img/avatar/muzi.png";
import Apachi from "@assets/img/avatar/apeach.png";

import Rock from "@assets/img/rps/Rock.png";
import Scissors from "@assets/img/rps/scissors.png";
import Paper from "@assets/img/rps/paper.png";

import RPSGamePlayer from "@models/rps/RPSGamePlayer";
import { useState } from "react";
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

  // FIXME 배열로 쓰기보다는 rps 속성에 따라서 이미지를 택하도록
  const rockScissorsPaperImg = [Rock, Scissors, Paper];

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

  const player: RPSGamePlayer = {
    name: "나",
    rps: null,
    avatarUri: "avatar://ryan.png",
    history: getInitialHistoryState(),
  };
  const counters: RPSGamePlayer[] = [
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
  ];

  // const [rockScissorsPaper, setRockScissorsPaper] =
  //   useState<>("ROCK");

  const showImg = () => {
    // 기획상 승부에서 상대방이 찌가 많이나올수록 게임이 흥미로워짐
    const chagne = Math.round(Math.random() * 2);
    // 단순 바꾸기
    const imgNum = Math.floor(Math.random() * 2 + 1);

    const change = rockScissorsPaperImg[imgNum];
    setInterval(rockScissorsPaperImg[imgNum], 200);
  };

  return (
    <ul className="fixed right-0 left-0 bottom-0 items-end px-8 flex justify-between py-4 bg-main-contra">
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
        <li className="w-[20vw] h-[12vw] flex flex-row justify-between gap-4 border-main border-2 rounded-md p-2 px-6 bg-main text-main-contra">
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
