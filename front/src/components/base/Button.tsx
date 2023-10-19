interface ButtonProps {
  size?: "s" | "m";
  onClick: VoidFunction;
  text: string;
  className?: string;
}

export const Button = ({
  onClick,
  text,
  size = "m",
  className,
}: ButtonProps): JSX.Element => {
  return (
    // <button
    //   onClick={onClick}
    //   className={`border-0 btn btn-active btn-secondary ${
    //     size === "m" ? "w-24" : "w-24"
    //   } ${className}`}
    // >
    <button
      onClick={onClick}
      className={`border-0 btn btn-active btn-secondary bg-gradient-to-r from-pink-500 to-violet-500
       ${size === "m" ? "w-24" : "w-24"}
      } ${className}`}
    >
      {text}
    </button>
  );
};
