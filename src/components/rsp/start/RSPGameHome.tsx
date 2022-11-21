import { useState } from "react";
import RockScissorsPaperGame from "./widgets/RockScissorsPaperGame";
import RSPGameStartPage from "./widgets/RSPGameStartPage";

const RSPGameHome = () => {
  const [isStart, setStart] = useState<boolean>(false);

  return (
    <div className="w-full h-screen bg-main-contra flex flex-col items-center">
      {!isStart ? (
        <RSPGameStartPage setStart={setStart} />
      ) : (
        <RockScissorsPaperGame />
      )}
    </div>
  );
};

export default RSPGameHome;
