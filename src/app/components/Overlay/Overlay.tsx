import { classNames } from "../../../utils";
import React, { useEffect, useState } from "react";

const Overlay = (props) => {
  const { children, container, isActive } = props;

  return (
    <div className="overlay relative h-full">
      <div className="h-full">{children}</div>
      {/* <div
        className={classNames(
          isActive ? "overlay-active" : "overlay-inactive",
          container === "parent" ? "overlay-parent-container" : "",
          "absolute top-0 left-0 pointer-events-none"
        )}
      ></div> */}
    </div>
  );
};

export default Overlay;
