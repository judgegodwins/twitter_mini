import { createElement, FC, MouseEventHandler } from "react";
import Ellipsis from "svg/Ellipsis.svg";

interface IconButtonProps {
  edge?: "start" | "end";
  icon: any;
  color?: "normal" | "primary",
  onClick?: MouseEventHandler<HTMLDivElement>;
}


const IconButton: FC<IconButtonProps> = ({ edge, icon, color, onClick }) => (
  <div
    className={`flex justify-center items-center w-8 h-fit hover:bg-sky-600/10 rounded-full cursor-pointer ${
      edge ? (edge === "start" && "-ml-2") || (edge === "end" && "-mr-2") : ""
    }`}
    onClick={onClick}
  >
    {createElement(
      icon,
      { className: `${color === 'primary' ? "fill-sky-600" : "fill-slate-500"} w-[17.5px] h-[17.5px] max-w-full` },
      null
    )}
    {/* <Icon className="dark:fill-slate-500 w-[17.5px] h-[17.5px] max-w-full" /> */}
  </div>
);

export const EllipsisIcon: FC<Pick<IconButtonProps, "edge" | "onClick">> = (props) => (
  <IconButton {...props} icon={Ellipsis} />
);

export default IconButton;
