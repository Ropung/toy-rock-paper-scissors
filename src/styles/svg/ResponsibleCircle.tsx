import { CommonSVGProps } from "@utils/common/props";
import { FunctionComponent as FC } from "react";

export interface esponsibleCircleProps
  extends Omit<CommonSVGProps, "viewBox"> {}

const ResponsibleCircle: FC<esponsibleCircleProps> = (props) => {
  return (
    // 반응형 원을 구현하기 위해서는 svg.viewBox를 circle.r의 2배 범위로 지정하여야 함.
    <svg viewBox="0 0 40 40" {...props}>
      {/* ViewBox 기준 50%, 50% 지점에 center 좌표, 반지름은 ViewBox의 절반 */}
      <circle cx="50%" cy="50%" r="50%" />
    </svg>
  );
};

export default ResponsibleCircle;
