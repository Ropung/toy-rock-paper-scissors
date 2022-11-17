import { motion } from "framer-motion";
import MainButton from "@styles/button";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Rock from "@assets/img/rsp/Rock.png";
import Scissors from "@assets/img/rsp/scissors.png";
import Paper from "@assets/img/rsp/paper.png";
import RockScissorsPaper from "@models/rsp/RockScissorsPaper";

export interface SelectRSPModalProps {
  // 가위바위보 상태
  rspSelect: RockScissorsPaper | null;
  setRspSelect: React.Dispatch<React.SetStateAction<RockScissorsPaper | null>>;
  // 상태창 닫기
  isSelectOpen: boolean;
  setSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectRSPModal: FunctionComponent<SelectRSPModalProps> = (props) => {
  const { rspSelect, setRspSelect, isSelectOpen, setSelectOpen } = props;

  const [selectTimeOver, setSelectTimeOver] = useState<number>(5);

  const randomRPSMap: { [key in number]: RockScissorsPaper } = {
    0: "ROCK",
    1: "SCISSORS",
    2: "PAPER",
  };

  useLayoutEffect(() => {
    if (selectTimeOver <= 0) {
      // 기획상 승부에서 찌가 많이나올수록 게임이 흥미로워짐
      const random = Math.round(Math.random() * 2);
      const randomRPS = randomRPSMap[random];
      rspSelect == null && setRspSelect(randomRPS);

      setSelectOpen(false);
      return;
    }
    const timeout = setTimeout(() => {
      let restTime = selectTimeOver - 1;
      setSelectTimeOver(restTime);
    }, 1000);
  }, [selectTimeOver, isSelectOpen]);

  return (
    <motion.div
      className="fixed z-0 top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      <aside
        className="fixed z-10 w-full h-full bg-black bg-opacity-20"
        onClick={() => {
          setSelectOpen(false);
        }}
      ></aside>
      <aside className="fixed z-20 m-4 top-1/2 -translate-y-2/3 min-w-[70vw] min-h-[40vh] flex flex-col gap-4 justify-center  bg-main text-main-contra border-2 border-black rounded px-4 py-4 after:absolute after:bottom-0 after:z-10 after:w-8 after:h-8 after:left-1/2 after:translate-y-1/2 after:-translate-x-1/2 after:rotate-45 after:border-b-2 after:border-r-2 after:border-black  after:bg-main">
        <div className="w-full flex flex-col items-start text-2xl px-4">
          <p className="text-3xl">
            가위바위보를 선택해주세요! ({selectTimeOver ?? 30}초)
          </p>
          <span className="text-lg">
            (시간이 초과되면 자동으로 선택됩니다.)
          </span>
        </div>
        <div className="w-full flex gap-4 justify-center">
          <img
            className={`w-1/4 pb-1 ${
              rspSelect === "ROCK" ? "border-b-2 border-main-contra p-0" : ""
            }`}
            onClick={() => {
              setRspSelect("ROCK");
            }}
            src={Rock}
            alt=""
          />
          <img
            className={`w-1/4 pb-1 ${
              rspSelect === "SCISSORS"
                ? "border-b-2 border-main-contra p-0"
                : ""
            }`}
            onClick={() => {
              setRspSelect("SCISSORS");
            }}
            src={Scissors}
            alt=""
          />
          <img
            className={`w-1/4 pb-1 ${
              rspSelect === "PAPER" ? "border-b-2 border-main-contra p-0" : ""
            }`}
            onClick={() => {
              setRspSelect("PAPER");
            }}
            src={Paper}
            alt=""
          />
        </div>
        <MainButton
          className="w-full border-2 border-black text-2xl font-bold !bg-main-contra text-main z-30"
          onClick={() => {
            if (rspSelect) {
              setRspSelect(rspSelect);
              setSelectOpen(false);
              return;
            }
            // 기획상 승부에서 찌가 많이나올수록 게임이 흥미로워짐
            const random = Math.round(Math.random() * 2);
            const randomRPS = randomRPSMap[random];
            setRspSelect(randomRPS);

            setSelectOpen(false);
          }}
        >
          선택하기
        </MainButton>
      </aside>
    </motion.div>
  );
};

export default SelectRSPModal;
