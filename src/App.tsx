import { useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Path from "./utils/routes/Path";
// 컴포넌트
import HomePage from "./components/home/HomePage";
import GNB from "./components/common/nav/GNB";
import RSPGameHome from "@components/rsp/start/RSPGameHome";
import TicTacToePage from "@components/tic-tac-toe/TicTacToePage";
import BullsAndCowsPage from "@components/bulls-and-cows/BullsAndCowsPage";

function App() {
  const location = useLocation();
  const { HOME, RSP, TTT, BC } = Path;

  const [hasNav, setHasNav] = useState<boolean>(false);

  useLayoutEffect(() => {
    const pathname =
      location.pathname.endsWith("/") && location.pathname.length > 1
        ? location.pathname.slice(0, -1)
        : location.pathname;

    const hasNav = [HOME, RSP].includes(pathname);
    setHasNav(hasNav);
  }, [location.pathname]);

  return (
    <div className="pt-32">
      {hasNav && <GNB />}
      <Routes>
        <Route path={HOME} element={<HomePage />} />
        <Route path={RSP} element={<RSPGameHome />} />
        <Route path={TTT} element={<TicTacToePage />} />
        <Route path={BC} element={<BullsAndCowsPage />} />
        {/* TODO redirect to HOME on wrong path */}
      </Routes>
    </div>
  );
}

export default App;
