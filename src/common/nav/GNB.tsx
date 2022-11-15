import { Link } from "react-router-dom";
import Path from "../../utils/routes/Path";

const GNB = () => {
  const { HOME, RPS } = Path;
  return (
    <nav className="w-screen flex flex-row h-fit bg-main">
      <header className="w-full h-fit flex justify-between items-center px-6 py-4">
        <div className="text-5xl text-sub">Ropung</div>
        <ul className="flex flex-row gap-6 items-center text-sub text-xl">
          <li className="cursor-pointer">
            <Link to={RPS}>메뉴1</Link>
          </li>
          <li className="cursor-pointer">
            <Link to={HOME}>메뉴2</Link>
          </li>
          <li className="cursor-pointer">
            <Link to={HOME}>메뉴3</Link>
          </li>
        </ul>
      </header>
    </nav>
  );
};

export default GNB;
