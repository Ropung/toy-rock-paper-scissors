import { FunctionComponent as FC } from "react";
import { GiCamel, GiSnake } from "react-icons/gi";

export interface TicTacToeCellProps {
  oxState: "O" | "X" | null;
  className?: string;
  style?: React.CSSProperties;
}

const TicTacToeCell: FC<TicTacToeCellProps> = (props) => {
  const { oxState, className, ...restProps } = props;
  return (
    //
    <article
      {...restProps}
      className={`w-[10vw] h-[10vw] border cursor-pointer flex items-center justify-center ${className}`}
    >
      {oxState === "O" && (
        <GiCamel className="w-1/2 h-1/2 fill-primary drop-shadow-lg" />
      )}
      {oxState === "X" && (
        <GiSnake className="w-1/2 h-1/2 fill-secondary drop-shadow-lg" />
      )}
    </article>
  );
};

export default TicTacToeCell;
