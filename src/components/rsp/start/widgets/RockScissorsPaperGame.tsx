import Ryan from "@assets/img/avatar/ryan.png";
import Prodo from "@assets/img/avatar/prodo.png";
import Muzi from "@assets/img/avatar/muzi.png";
import Apachi from "@assets/img/avatar/apeach.png";

import Rock from "@assets/img/rsp/Rock.png";
import Scissors from "@assets/img/rsp/scissors.png";
import Paper from "@assets/img/rsp/paper.png";
import RandomRSP from "@assets/img/rsp/random_rsp.png";

import RSPGamePlayer from "@models/rsp/RSPGamePlayer";
import { useCallback, useEffect, useState } from "react";
import RockScissorsPaper from "@models/rsp/RockScissorsPaper";

import SelectRSPModal from "../../modal/SelectRSPModal";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import RSPPianoMap from "@components/rsp/map/RSPPianoMap";
import PlayerPiece from "@components/rsp/piece/PlayerPiece";
import RPSPianoKey from "@models/rsp/RPSPianoKey";

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
    username: "me",
    name: "나",
    rsp: null,
    boardIndex: 0,
    avatarUri: "avatar://ryan.png",
    history: getInitialHistoryState(),
  });

  const [counters, setCounters] = useState<RSPGamePlayer[]>([
    {
      username: "COM1",
      name: "프로도",
      rsp: null,
      boardIndex: 0,
      avatarUri: "avatar://prodo.png",
      history: getInitialHistoryState(),
    },
    {
      username: "COM2",
      name: "무지",
      rsp: null,
      boardIndex: 0,
      avatarUri: "avatar://muzi.png",
      history: getInitialHistoryState(),
    },
    {
      username: "COM3",
      name: "어피치",
      rsp: null,
      boardIndex: 0,
      avatarUri: "avatar://apeach.png",
      history: getInitialHistoryState(),
    },
  ]);
  // 플레이어 모달 오픈창
  const [isModalMove, setModalMove] = useState<boolean>(false);
  // 플레이어 가위바위보 모달선택창
  const [isSelectOpen, setSelectOpen] = useState<boolean>(false);
  // 플레이어 가위바위보 선택
  const [isSelectConfirm, setSelectConfirm] = useState<boolean>(false);

  // 플레이어 가위바위보 모달창 선택 상태관리
  const [rspSelect, setRspSelect] = useState<RockScissorsPaper | null>(null);

  const [pianoKeys, setPianoKeys] = useState<RPSPianoKey[]>([
    // 왼쪽 5
    {
      maxSeat: 4,
      basePosition: {
        left: "5vw",
        top: "55%",
      },
      playerList: [player, ...counters],
    },
    {
      maxSeat: 2,
      basePosition: {
        left: "calc(10vw + 0.125rem)",
        top: "30%",
      },
      playerList: [],
    },
    {
      maxSeat: 4,
      basePosition: {
        left: "calc(15vw + 0.25rem)",
        top: "55%",
      },
      playerList: [],
    },
    {
      maxSeat: 2,
      basePosition: {
        left: "calc(20vw + 0.25rem + 0.125rem)",
        top: "30%",
      },
      playerList: [],
    },

    {
      maxSeat: 4,
      basePosition: {
        left: "calc(25vw + 0.5rem)",
        top: "55%",
      },
      playerList: [],
    },
    //
    {
      maxSeat: 4,
      basePosition: {
        left: "calc(35vw + 0.75rem)",
        top: "55%",
      },
      playerList: [],
    },
    {
      maxSeat: 2,
      basePosition: {
        left: "calc(40vw + 0.75rem + 0.125rem)",
        top: "30%",
      },
      playerList: [],
    },
    {
      maxSeat: 4,
      basePosition: {
        left: "calc(45vw + 1rem)",
        top: "55%",
      },
      playerList: [],
    },
    {
      maxSeat: 2,
      basePosition: {
        left: "calc(50vw + 1rem + 0.125rem)",
        top: "30%",
      },
      playerList: [],
    },
    {
      maxSeat: 4,
      basePosition: {
        left: "calc(55vw + 1.25rem)",
        top: "55%",
      },
      playerList: [],
    },
    {
      maxSeat: 2,
      basePosition: {
        left: "calc(60vw + 1.25rem + 0.125rem)",
        top: "30%",
      },
      playerList: [],
    },
    {
      maxSeat: 4,
      basePosition: {
        left: "calc(65vw + 1.5rem)",
        top: "55%",
      },
      playerList: [],
    },
    {
      maxSeat: 2,
      basePosition: {
        left: "calc(70vw + 1.5rem + 0.125rem)",
        top: "30%",
      },
      playerList: [],
    },
    {
      maxSeat: 4,
      basePosition: {
        left: "calc(75vw + 1.75rem)",
        top: "55%",
      },
      playerList: [],
    },
  ]);

  // 각 상황(게임 시작, 게임 종료, 냈을 때, 시간이 끝날 때 등)에 따라
  // 기존 Interval을 Clear해 주기 위해서.
  const [randomRSPAnimateInterval, setRandomRSPAnimateInterval] =
    useState<NodeJS.Timer | null>(null);

  const [playerAvatar, setPlayerAvatar] = useState<string>("");
  const [countersAvatars, setCountersAvatars] = useState<string[]>([]);

  const decideWinners = useCallback(() => {
    const rspSet = [
      ...new Set([player.rsp, ...counters.map(({ rsp }) => rsp)]),
    ];

    if (rspSet.length !== 2) {
      // DRAW
      return [];
    }

    const rspValues = {
      ROCK: 0,
      SCISSORS: 1,
      PAPER: 2,
    };

    const l = rspValues[rspSet[0] as RockScissorsPaper]; // Runtime에 보장됨(느낌표 대체 가능하나 삼갔음)
    const r = rspValues[rspSet[1] as RockScissorsPaper];

    // 승패를 결정한 답안지
    const winnerLRMatrix = [
      // D: DRAW , L: LEFT WIN, R: RIGHT WIN
      ["D", "L", "R"],
      ["R", "D", "L"],
      ["L", "R", "D"],
    ];

    const winnerLR = winnerLRMatrix[l][r];

    const winnerRSP = winnerLR === "L" ? rspSet[0] : rspSet[1];

    const players = [player, ...counters];
    const winners = players.filter(({ rsp }) => rsp === winnerRSP);
    return winners;
  }, [player, counters]);

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
    // const random = Math.floor(Math.random() * 3);

    const randoms = [0, 0, 0];
    randoms[0] = Math.round(Math.random() * 2);
    randoms[1] = Math.round(Math.random() * 2);
    randoms[2] = Math.round(Math.random() * 2);

    const result = [...counters];

    result[0].rsp = rspSet[randoms[0]];
    result[1].rsp = rspSet[randoms[1]];
    result[2].rsp = rspSet[randoms[2]];

    setCounters(result);

    // setCounters(newCounters);

    const interval = setInterval(() => {
      if (
        counters[0].rsp == null ||
        counters[1].rsp == null ||
        counters[2].rsp == null
      ) {
        return;
      }

      // 반복문을 썼지만 가독성이 떨어져 반복문 사용안함
      const randoms = [0, 0, 0];
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

    if (isSelectConfirm) clearInterval(interval);
    return () => clearInterval(interval);
  }, [isSelectConfirm]);

  useEffect(() => {
    const playerAvatar = player.avatarUri.startsWith("avatar://")
      ? avatarMap[player.avatarUri as keyof typeof avatarMap]
      : player.avatarUri;

    setPlayerAvatar(playerAvatar);
  }, [player]);
  useEffect(() => {
    const countersAvatar = counters.map((counter) =>
      counter.avatarUri.startsWith("avatar://")
        ? avatarMap[counter.avatarUri as keyof typeof avatarMap]
        : counter.avatarUri
    );

    setCountersAvatars(countersAvatar);
  }, [counters]);

  return (
    <>
      {/* 게임진행을 위한 모달창 */}
      {isSelectOpen && (
        <SelectRSPModal
          rspSelect={rspSelect}
          setRspSelect={setRspSelect}
          isSelectOpen={isSelectOpen}
          setSelectOpen={setSelectOpen}
          setSelectConfirm={setSelectConfirm}
        />
      )}
      {/* 게임 화면표현 */}
      <RSPPianoMap>
        <PlayerPiece
          src={playerAvatar}
          left={pianoKeys[player.boardIndex].basePosition.left}
          top={pianoKeys[player.boardIndex].basePosition.top}
        />
        {countersAvatars.map((counterAvatar, index) => {
          const { username, boardIndex } = counters[index];
          const targetPianoKey = pianoKeys[boardIndex];

          const myIndexOnPianoKey = targetPianoKey.playerList.indexOf(
            counters[index]
          );

          return (
            <PlayerPiece
              key={`PLAYER-PIECE-${username}`}
              src={counterAvatar}
              left={pianoKeys[boardIndex].basePosition.left}
              top={`calc(${pianoKeys[boardIndex].basePosition.top} + ${
                myIndexOnPianoKey * 6
              }vw)`}
            />
          );
        })}
      </RSPPianoMap>

      {/* 플레이어들의 바텀창 */}
      <motion.div
        className="fixed right-0 left-0 bottom-0 min-w-full min-h-fit flex flex-col gap-2 border-t border-black bg-black bg-opacity-10 z-0"
        animate={isModalMove ? "open" : "closed"}
        variants={{
          open: { y: "80%" },
          closed: { y: 0 },
        }}
      >
        <aside
          className="w-screen h-10 cursor-pointer"
          onClick={() => {
            setModalMove(!isModalMove);
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-2xl text-main">
            <FaChevronDown
              className={`duration-500 ease-in-out ${
                isModalMove ? "rotate-180 " : ""
              }`}
            />
          </div>
        </aside>
        <ul className="w-full grid jm:grid-cols-2 grid-cols-4 pb-4 px-4 gap-4 justify-items-center">
          {/* 나 */}
          <li className="min-h-fit flex flex-col justify-between border-dark border-2 rounded-md py-4 px-6 bg-main text-main-contra">
            <div className="w-1/2 flex justify-between gap-2">
              <img
                className="flex justify-center items-center"
                src={playerAvatar}
                alt=""
              />
              <img
                className="flex justify-center items-center"
                onClick={() => {
                  // 모달창 오픈
                  setSelectOpen(true);
                  // 가위바위보 상태 초기화
                  setRspSelect(null);
                  // FIXME 게임상황에 따라 변경가능하게 기획해야됨
                  setSelectConfirm(false);
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
          {counters.map((counter, index) => (
            <li
              key={counter.username}
              className="min-h-fit flex flex-col justify-between border-dark border rounded-md py-4 px-6 bg-light text-main-contra"
            >
              <div className="w-full flex justify-between gap-2">
                <img
                  className="w-1/2 flex justify-center"
                  src={countersAvatars[index]}
                  alt=""
                />
                <img
                  className="w-1/2 flex justify-center items-center"
                  src={
                    rspIconMap[counter.rsp as RockScissorsPaper] ?? RandomRSP
                  }
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
      </motion.div>
    </>
  );
};

export default RockScissorsPaperGame;
