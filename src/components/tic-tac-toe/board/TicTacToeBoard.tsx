import TicTacToeCell from "./widgets/TicTacToeCell";

const TicTacToeBoard = () => {
  return (
    <section className="w-fit grid grid-cols-3 border-2">
      <TicTacToeCell oxState={"O"} />
      <TicTacToeCell oxState={"X"} />
      <TicTacToeCell oxState={null} />
      <TicTacToeCell oxState={null} />
      <TicTacToeCell oxState={"O"} />
      <TicTacToeCell oxState={null} />
      <TicTacToeCell oxState={null} />
      <TicTacToeCell oxState={null} />
      <TicTacToeCell oxState={"X"} />
    </section>
  );
};

export default TicTacToeBoard;
