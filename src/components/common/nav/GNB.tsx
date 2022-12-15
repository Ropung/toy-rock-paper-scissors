import { Link } from "react-router-dom";
import Path from "@utils/routes/Path";

const GNB = () => {
  const { HOME, RSP } = Path;

  return (
    <nav className="fixed top-0 right-0 left-0 z-[100] w-screen flex flex-row h-32 bg-light text-dark select-none px-8 pt-8 pb-8 border-b shadow-md">
      <header className="w-full flex justify-between items-center text-5xl font-bold tracking-wider">
        Ropung
      </header>
      <ul className="flex flex-row items-end text-2xl whitespace-nowrap gap-10">
        <li>
          <Link to={HOME}>홈</Link>
        </li>
        <li>
          <Link to={RSP}>프로젝트</Link>
        </li>
        <li>
          <Link to={HOME}>UI</Link>
        </li>
      </ul>
    </nav>
  );
};

export default GNB;
