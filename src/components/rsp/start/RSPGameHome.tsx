import { useState } from "react";
import RockScissorsPaperGame from "./widgets/RockScissorsPaperGame";
import RSPGameStartPage from "./widgets/RSPGameStartPage";

const RSPGameHome = () => {
  const [isStart, setStart] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen bg-main-contra">
      {!isStart && <RSPGameStartPage setStart={setStart} />}
      {isStart && <RockScissorsPaperGame />}
    </div>
  );
};

export default RSPGameHome;
