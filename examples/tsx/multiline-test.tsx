import React from "react";
import clsx from "clsx";
import cx from "classnames";

function MultilineTest() {
  return (
    <div>
      {/* Multi-line clsx - is this the issue? */}
      <div className="px-4 py-2 rounded-md border-2 focus:ring-2 focus:ring-blue-500">
        Multiline clsx test
      </div>
    </div>
  );
}

export default MultilineTest;
