import TicTacToeBoard from "./board/TicTacToeBoard";

const TicTacToePage = () => {
  return (
    //
    <div className="flex flex-col gap-4">
      <header className="flex justify-center items-center">
        <h1 className="text-[3vw] font-bold grid grid-cols-3 gap-y-[0.5vw] items-end select-none w-[30vw]">
          <span className="col-span-3 text-primary">primaryCamel</span>
          <span className="row-start-2 col-start-2 text-center drop-shadow-[0.1em_0.1em_rgba(0_0_0/0.5)]">
            vs
          </span>
          <span className="row-start-3 col-span-3 col-end-4 text-secondary text-right">
            secondary_snake
          </span>
        </h1>
      </header>

      {/* Game Board */}
      <div className="flex flex-col items-center">
        <TicTacToeBoard />
      </div>
    </div>
  );
};

export default TicTacToePage;
