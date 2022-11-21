import React, { FunctionComponent, useEffect, useRef } from "react";
import RandomRSP from "@assets/img/rsp/random_rsp.png";
export interface RSPPianoMapProps {
  children: React.ReactNode;
}

const RSPPianoMap: FunctionComponent<RSPPianoMapProps> = ({ children }) => {
  const whiteKeyboard = "w-[10vw] h-full bg-white";
  const blackKeyboard = "w-[10vw] h-full bg-black";

  const keyboradRef = useRef<HTMLDivElement | null>(null);
  const whiteKeyULRef = useRef<HTMLUListElement | null>(null);
  const blackKeyULRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const setKeyboardDivSize = () => {
      if (
        !keyboradRef.current ||
        !whiteKeyULRef.current ||
        !blackKeyULRef.current
      ) {
        //
        const error = new Error("연결되지 않은 Ref가 있습니다.");
        console.error(error.stack);
        return;
      }

      keyboradRef.current.style.width =
        whiteKeyULRef.current.offsetWidth + "px";

      blackKeyULRef.current.style.transform = `translateX(${
        // 다음 코드의 의존도: 흰 건반이 딱 8개고, 검은 건반의 시작점은 흰 건반 하나의 절반 사이즈. 즉 흰 건반 UL의 1/16 사이즈
        // (whiteKeyULRef.current.offsetWidth >> 4) + 2
        // 고친다면:
        ((whiteKeyULRef.current.firstChild as HTMLElement).offsetWidth >> 1) + 2
      }px)`;
    };

    setKeyboardDivSize();

    window.onresize = (evt) => {
      setKeyboardDivSize();
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-[60%] flex items-center justify-center">
        {/* 건반 Container*/}
        <div ref={keyboradRef} className="relative h-[80%]">
          {/* 흑건 6 List  */}
          <ul
            ref={blackKeyULRef}
            className="absolute z-[1] grid grid-cols-7 w-fit h-[60%] items-center gap-1 justify-start left-0"
          >
            <li className={`${blackKeyboard}`} />
            <li className={`${blackKeyboard}`} />
            <li className={`${blackKeyboard} col-start-4`} />
            <li className={`${blackKeyboard}`} />
            <li className={`${blackKeyboard}`} />
            <li className={`${blackKeyboard}`} />
          </ul>
          {/* 백건 8 List */}
          <ul
            ref={whiteKeyULRef}
            className="absolute z-0 flex w-fit h-full flex-row gap-1 items-center justify-start"
          >
            <li className={`${whiteKeyboard}`} />
            <li className={`${whiteKeyboard}`} />
            <li className={`${whiteKeyboard}`} />
            <li className={`${whiteKeyboard}`} />
            <li className={`${whiteKeyboard}`} />
            <li className={`${whiteKeyboard}`} />
            <li className={`${whiteKeyboard}`} />
            <li className={`${whiteKeyboard}`} />
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
};

export default RSPPianoMap;
