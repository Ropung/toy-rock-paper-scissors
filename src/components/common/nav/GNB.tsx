import { Link } from "react-router-dom";
import Path from "../../../utils/routes/Path";

const GNB = () => {
  const { HOME, RPS } = Path;

  return (
    <nav className="fixed top-0 right-0 left-0 w-screen flex flex-row h-fit bg-light text-main select-none px-8 pt-16 pb-8 border-b shadow-md">
      <header className="w-full h-fit flex justify-between items-center text-5xl font-bold tracking-wider">
        Ropung
      </header>
      <ul className="flex flex-row items-end text-2xl whitespace-nowrap gap-10">
        <li>
          <Link to={HOME}>홈</Link>
        </li>
        <li>
          <Link to={RPS}>가위바위보</Link>
        </li>
        <li>
          <Link to={HOME}>UI</Link>
        </li>
      </ul>
    </nav>
  );
};

export default GNB;
