import { CommonButtonProps } from "@utils/common/props";
import { FunctionComponent as FC } from "react";

// snippet: react snippet
// react rafce

const ButtonInterface: FC<CommonButtonProps> = (props) => {
  const { children, className, onClick, ...restProps } = props;

  return (
    <button
      {...restProps}
      onClick={(evt) => {
        evt.preventDefault(); // form 태그 안에서 submit 버튼으로 인식하지 않도록
        onClick && onClick(evt);
      }}
      className={`px-4 py-2 rounded duration-150 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

const MainButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-main text-main-contra ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export default MainButton;

export const SubButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-sub text-sub-contra ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const PrimaryButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-primary text-primary-contra active:bg-primary-active ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const SecondaryButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-secondary text-secondary-contra active:bg-secondary-active ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const SuccessButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-success text-success-contra active:bg-success-active ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const InfoButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-info text-info-contra active:bg-info-active ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const WarningButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-warning text-warning-contra active:bg-warning-active ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const DangerButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-danger text-danger-contra active:bg-danger-active ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const LightButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-light text-light-contra active:bg-light-active ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const DarkButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`bg-dark text-dark-contra active:bg-dark-active ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const LinkButton: FC<CommonButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={`underline bg-transparent text-link active:text-link-active px-0 py-0 ${className}`}
    >
      {children}
    </ButtonInterface>
  );
};
