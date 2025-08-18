import React from "react";
import cx from "classnames";
import clsx from "clsx";

function CxTest() {
  return (
    <div>
      {/* cx function is not supported by default - custom function */}
      <div className={cx("p-1 m-2", "border-2")}>
        cx function test - not transformed
      </div>

      {/* clsx function is supported by default */}
      <div className={clsx("p-1 m-2", "border-2")}>
        clsx function test - transformed
      </div>
    </div>
  );
}

export default CxTest;
