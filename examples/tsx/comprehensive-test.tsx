import React from "react";
import cx from "classnames";
import clsx from "clsx";
import classNames from "classnames";

function ComprehensiveTest() {
  const dynamicClass = "p-1 m-2";
  const isActive = true;

  return (
    <div>
      {/* 1. Default supported functions */}
      <div className={clsx("p-1", "m-2")}>clsx function</div>
      <div className={classNames("p-1", "m-2")}>classNames function</div>

      {/* 2. Custom functions (handled by StringLiteral visitor) */}
      <div className={cx("p-1", "m-2")}>cx function</div>

      {/* 3. Ternary operators (handled by StringLiteral visitor) */}
      <div className={isActive ? "p-1 active" : "p-[2px] inactive"}>
        Ternary operator
      </div>

      {/* 4. Variables (handled by StringLiteral visitor) */}
      <div className={dynamicClass}>Variable class</div>

      {/* 5. Regular string className */}
      <div className="p-1 m-2 border-2">Regular className</div>

      {/* 6. Any functions also work! */}
      <div className={myCustomHelper("p-1", "rounded-md")}>Custom function</div>
    </div>
  );
}

// Arbitrary custom function
function myCustomHelper(...classes: string[]) {
  return classes.join(" ");
}

export default ComprehensiveTest;
