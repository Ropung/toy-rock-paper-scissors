import React from "react";

const RSPPianoMap = () => {
  const whiteKeyboard = "w-16 h-full bg-white";
  const blackKeyboard = "w-16 h-full bg-black";

  return (
    <div className="w-full h-full">
      <div className="w-full h-[50%] bg-black bg-opacity-20 flex items-center justify-center">
        {/* 흑건 Container*/}
        <div className="relative w-full h-[80%]">
          {/* 흑건 List  */}
          <ul className="absolute z-10 grid grid-cols-7 w-fit h-[60%] items-center gap-1 justify-start pl-8">
            <li className={`${blackKeyboard}`}> </li>
            <li className={`${blackKeyboard}`}> </li>
            <li className={`${blackKeyboard} col-start-4`}> </li>
            <li className={`${blackKeyboard}`}> </li>
            <li className={`${blackKeyboard}`}> </li>
            <li className={`${blackKeyboard}`}> </li>
          </ul>
          <ul className="absolute z-0 flex w-full h-full flex-row gap-1 items-center justify-start">
            <li className={`${whiteKeyboard}`}> </li>
            <li className={`${whiteKeyboard}`}> </li>
            <li className={`${whiteKeyboard}`}> </li>
            <li className={`${whiteKeyboard}`}> </li>
            <li className={`${whiteKeyboard}`}> </li>
            <li className={`${whiteKeyboard}`}> </li>
            <li className={`${whiteKeyboard}`}> </li>
            <li className={`${whiteKeyboard}`}> </li>
            <li className={`${whiteKeyboard}`}></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RSPPianoMap;
