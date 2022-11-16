import { useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Path from "./utils/routes/Path";
// 컴포넌트
import HomePage from "./components/home/HomePage";
import RockPaperScissors from "./components/rps/RockPaperScissors";
import GNB from "./components/common/nav/GNB";

function App() {
  const location = useLocation();
  const { HOME, RPS } = Path;

  const [hasNav, setHasNav] = useState<boolean>(false);

  useLayoutEffect(() => {
    const pathname =
      location.pathname.endsWith("/") && location.pathname.length > 1
        ? location.pathname.slice(0, -1)
        : location.pathname;

    const hasNav = [HOME, RPS].includes(pathname);
    setHasNav(hasNav);
  }, [location.pathname]);

  return (
    <div>
      {hasNav && <GNB />}
      <Routes>
        <Route path={HOME} element={<HomePage />} />
        <Route path={RPS} element={<RockPaperScissors />} />
      </Routes>
    </div>
  );
}

export default App;
