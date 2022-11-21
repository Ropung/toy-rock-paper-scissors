import MainButton from "@styles/button";
import React, { FunctionComponent } from "react";
import RSPLOGO from "@assets/img/rsp/random_rsp.png";

interface RSPGameStartPageProps {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

const RSPGameStartPage: FunctionComponent<RSPGameStartPageProps> = (props) => {
  const { setStart } = props;

  return (
    <div className="w-full h-full bg-main-contra flex flex-col gap-4 justify-start items-center pt-16">
      <img className="w-[50vw]" src={RSPLOGO} alt="" />
      <MainButton
        className="w-[80vw] !p-8 text-5xl font-bold border-4 border-black"
        onClick={() => {
          setStart(true);
        }}
      >
        게임시작
      </MainButton>
    </div>
  );
};

export default RSPGameStartPage;
