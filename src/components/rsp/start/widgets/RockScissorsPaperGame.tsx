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

import { FaChevronDown } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
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

  const [opensHelp, setOpensHelp] = useState<boolean>(false);

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
      rsp: "ROCK",
      boardIndex: 0,
      avatarUri: "avatar://prodo.png",
      history: getInitialHistoryState(),
    },
    {
      username: "COM2",
      name: "무지",
      rsp: "SCISSORS",
      boardIndex: 0,
      avatarUri: "avatar://muzi.png",
      history: getInitialHistoryState(),
    },
    {
      username: "COM3",
      name: "어피치",
      rsp: "PAPER",
      boardIndex: 0,
      avatarUri: "avatar://apeach.png",
      history: getInitialHistoryState(),
    },
  ]);

  const [playerPosition, setPlayerPosition] = useState<{
    left: string;
    top: string;
  }>({
    left: "",
    top: "",
  });

  const [countersPosition, setCountersPosition] = useState<
    {
      left: string;
      top: string;
    }[]
  >([
    { left: "", top: "" },
    { left: "", top: "" },
    { left: "", top: "" },
  ]);

  // 플레이어 모달 오픈창
  const [isModalMove, setModalMove] = useState<boolean>(false);
  // 플레이어 가위바위보 모달선택창
  const [isSelectOpen, setSelectOpen] = useState<boolean>(false);
  // 플레이어 가위바위보 선택
  const [isSelectConfirm, setSelectConfirm] = useState<boolean>(false);
  // All player RSP 결정됨
  const [isEveryRSPDecided, setEveryRSPDecided] = useState<boolean>(false);

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
      // D: DRAW(unexpected), L: LEFT WIN, R: RIGHT WIN
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

  useEffect(() => {
    // 초기값 넣어서 기본값넣기
    const rspSet: RockScissorsPaper[] = ["ROCK", "SCISSORS", "PAPER"];
    // == null로 하면 undefined를 포함하여 비교해 줌.(undefined 또는 null일 때 true)
    // const random = Math.floor(Math.random() * 3);

    if (isSelectConfirm) {
      const randoms = [0, 0, 0];
      randoms[0] = Math.round(Math.random() * 2);
      randoms[1] = Math.round(Math.random() * 2);
      randoms[2] = Math.round(Math.random() * 2);

      const result = [...counters];

      result[0].rsp = rspSet[randoms[0]];
      result[1].rsp = rspSet[randoms[1]];
      result[2].rsp = rspSet[randoms[2]];

      setCounters(result);
      setEveryRSPDecided(true);
      return;
    }

    // setCounters(newCounters);

    const interval = setInterval(() => {
      if (
        counters[0].rsp == null ||
        counters[1].rsp == null ||
        counters[2].rsp == null
      ) {
        // unexpected
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

    return () => clearInterval(interval);
  }, [isSelectConfirm]);

  useEffect(() => {
    if (!isEveryRSPDecided) return;
    const winners = decideWinners();

    for (const winner of winners) {
      const prevIndex = winner.boardIndex;
      let nextIndex = Math.min(
        winner.boardIndex +
          {
            ROCK: 1,
            SCISSORS: 2,
            PAPER: 5,
          }[winner.rsp!],
        pianoKeys.length - 1
      );
      const originPianoKey = pianoKeys[prevIndex];
      let newPianoKey = pianoKeys[nextIndex];
      const originWinnerLenth = winners.filter((winner) => {
        return winner.boardIndex === prevIndex;
      }).length;
      const restSeat = newPianoKey.maxSeat - newPianoKey.playerList.length;

      // 남은자리가 부족하면
      let gain = 0;
      if (originWinnerLenth > restSeat) {
        //
        gain = newPianoKey.playerList.length === 0 ? -1 : 1;
      }

      // Pop from 기존 건반
      const popIndex = originPianoKey.playerList
        .map(({ username }) => username)
        .indexOf(winner.username);
      originPianoKey.playerList.splice(popIndex, 1);

      // 말이동 적용 및 limit 결승점 제한
      nextIndex = Math.min(nextIndex + gain, pianoKeys.length - 1);
      newPianoKey = pianoKeys[nextIndex];
      winner.boardIndex = nextIndex;

      // push to 새 건반
      // if (newPianoKey.maxSeat === 2) {
      //   prevIndex
      // }
      newPianoKey.playerList.push(winner);
    }

    setPlayer({ ...player });
    setCounters([...counters]);
    setPianoKeys(pianoKeys);
    setEveryRSPDecided(false);
  }, [isEveryRSPDecided, pianoKeys]);

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

  useEffect(() => {
    const targetPianoKey = pianoKeys[player.boardIndex];
    const myIndexOnPianoKey = targetPianoKey.playerList
      .map(({ username }) => username)
      .indexOf(player.username);

    const playerPosition = {
      left: pianoKeys[player.boardIndex].basePosition.left,
      top: `calc(${pianoKeys[player.boardIndex].basePosition.top} + ${
        myIndexOnPianoKey * 6
      }vw)`,
    };

    setPlayerPosition(playerPosition);

    const countersPositions = counters.map((counter) => {
      const targetPianoKey = pianoKeys[counter.boardIndex];
      const indexOnPianoKey = targetPianoKey.playerList
        .map(({ username }) => username)
        .indexOf(counter.username);

      const counterPosition = {
        left: pianoKeys[counter.boardIndex].basePosition.left,
        top: `calc(${pianoKeys[counter.boardIndex].basePosition.top} + ${
          indexOnPianoKey * 6
        }vw)`,
      };

      return counterPosition;
    });

    setCountersPosition(countersPositions);
  }, [player, counters, pianoKeys]);

  return (
    <>
      {/* 게임진행을 위한 모달창 */}
      {isSelectOpen && (
        <SelectRSPModal
          rspSelect={player.rsp}
          setRspSelect={(rspSelect) => {
            const newPlayer = { ...player };
            newPlayer.rsp = rspSelect;
            setPlayer(newPlayer);
          }}
          isSelectOpen={isSelectOpen}
          setSelectOpen={setSelectOpen}
          setSelectConfirm={setSelectConfirm}
        />
      )}
      {opensHelp && (
        <aside className="fixed bg-black bg-opacity-50 left-0 right-0 top-0 bottom-0 z-30" />
      )}
      {opensHelp && (
        <motion.aside
          className="fixed bg-main border-4 p-2 border-main-contra left-[12.2vw] w-[12vw] bottom-[12vw] h-[12vw] rounded-full z-[35]"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1.15 }}
        >
          <img
            className={`relative flex justify-center items-center`}
            onClick={() => {
              // 모달창 오픈
              setSelectOpen(true);
              // 가위바위보 상태 초기화
              setRspSelect(null);
              setSelectConfirm(false);
            }}
            src={rspIconMap[player.rsp as RockScissorsPaper] ?? RandomRSP}
            alt=""
          />
        </motion.aside>
      )}
      <aside
        className={`fixed right-8 top-40 z-40 group text-white flex flex-row-reverse gap-4`}
        onMouseEnter={() => setOpensHelp(true)}
        onMouseLeave={() => setOpensHelp(false)}
      >
        <FcInfo className="w-10 h-10" />
        <section className="absolute w-[50vw] z-40 bg-main-contra text-main bg-opacity-90 hidden group-hover:grid grid-cols-2 border border-white p-4 rounded-md">
          <article className="h-full">
            <h1 className="font-bold text-2xl">게임 방법</h1>
            <ol className="flex-auto flex flex-col justify-center gap-2 py-2">
              <li>
                1. 가위바위보 버튼(
                <img className="inline-block w-[2vw]" src={RandomRSP} alt="" />
                )을 누릅니다.
              </li>
              <li>
                2. 승리 시 묵은 한 칸, 찌는 두 칸, 빠는 다섯 칸 이동합니다.
              </li>
              <li>3. 마지막 건반에 도달해 보세요.</li>
            </ol>
          </article>
          <article className="flex flex-col border border-white p-4 rounded-md">
            <h1 className="font-bold">검은 건반 특수 규칙</h1>
            <ul className="flex-auto flex flex-col justify-center">
              <li>- 검은 건반에는 최대 두 명만 놓일 수 있습니다.</li>
              <li>
                - 빈 검은 건반에 세 명 이상이 올라가려 하면 그 전 흰 건반에
                놓이게 됩니다.
              </li>
              <li>
                - 검은 건반에 이미 한 명 이상이 올라가 있을 때 정원을 초과하려
                하면 '말 뛰어넘기'를 시전하여 그 다음 흰 건반에 놓이게 됩니다.
              </li>
            </ul>
          </article>
        </section>
      </aside>
      {/* 게임 화면표현 */}
      <RSPPianoMap>
        {(() => {
          const { boardIndex } = player;
          const targetPianoKey = pianoKeys[boardIndex];

          const myIndexOnPianoKey = targetPianoKey.playerList
            .map(({ username }) => username)
            .indexOf(player.username);

          return (
            <PlayerPiece
              src={playerAvatar}
              left={playerPosition.left}
              top={playerPosition.top}
            />
          );
        })()}

        {countersAvatars.map((counterAvatar, index) => {
          const { username } = counters[index];

          return (
            <PlayerPiece
              key={`PLAYER-PIECE-${username}`}
              src={counterAvatar}
              left={countersPosition[index].left}
              top={countersPosition[index].top}
            />
          );
        })}
      </RSPPianoMap>

      {/* 플레이어들의 바텀창 */}
      <motion.div
        className="fixed right-0 left-0 bottom-0 min-w-full min-h-fit flex flex-col gap-2 border-t border-black bg-black bg-opacity-10 z-20"
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
                className={`relative flex justify-center items-center`}
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
              <img className="w-1/3 opacity-60" src={Rock} alt="" />
              <img className="w-1/3 opacity-60" src={Scissors} alt="" />
              <img className="w-1/3 opacity-60" src={Paper} alt="" />
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
                <img className="w-1/3 opacity-60" src={Rock} alt="" />
                <img className="w-1/3 opacity-60" src={Scissors} alt="" />
                <img className="w-1/3 opacity-60" src={Paper} alt="" />
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default RockScissorsPaperGame;
