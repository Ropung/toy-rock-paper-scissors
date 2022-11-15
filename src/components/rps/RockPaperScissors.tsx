import ResponsibleCircle from "@styles/svg/ResponsibleCircle";

const RockPaperScissors = () => {
  return (
    <div>
      <div className="flex gap-4">
        <ResponsibleCircle className="w-[10vw]" />
        <ResponsibleCircle className="w-[10vw]" />
        <ResponsibleCircle className="w-[10vw]" />
        <ResponsibleCircle className="w-[10vw]" />
      </div>
    </div>
  );
};

export default RockPaperScissors;
