import { borderClasses } from "helpers/tailwindClasses";
import { FC } from "react";

const ThreadContainer: FC<{}> = ({ children }) => (
  <div className={`last:pb-14 last:border-0 border-b ${borderClasses}`}>
    {children}
  </div>
);

export default ThreadContainer;