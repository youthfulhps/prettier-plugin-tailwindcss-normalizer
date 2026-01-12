import React from "react";
import clsx from "clsx";
import cx from "classnames";

// Test complex cases
function ComplexComponent() {
  const errorMessage = "Padding p-[4px] is invalid"; // Should not be transformed

  /*
   * Mention arbitrary values in comments:
   * - p-[8px]: small padding
   * - m-[16px]: medium margin
   * These should not be transformed!
   */

  return (
    <div className="-m-4 mx-4 -mb-4 min-h-screen rounded-lg p-1 px-1 px-3 md:-mb-3 dark:md:hover:-m-3">
      {/* Various patterns */}
      <div
        className={cx(
          "rounded-md px-4 py-2",
          "focus:ring-2 focus:ring-blue-500"
        )}
      >
        <span className={"m-2 bg-white p-3"}>String inside braces</span>
      </div>

      {/* Template literal */}
      <div
        className={`h-[100px] w-[200px] border border-gray-300${
          true ? "p-5" : "p-10 px-5"
        }`}
      >
        Template literal test
      </div>

      {/* Regular text - should not be transformed */}
      <p>
        This text mentions classes like p-[4px] and m-[8px] but they should not
        be transformed.
      </p>

      {/* Error message output */}
      <div className="border-l-4 border-red-500 bg-red-100 p-4">
        {errorMessage}
      </div>

      <div
        className={
          true ? "p-4" : "p-10" // Now it transforms!
        }
      >
        <h1 className="text-xl font-bold">Ternary operator issue solved!</h1>
        <p>Now it works perfectly with format on save.</p>
      </div>
    </div>
  );
}

export default ComplexComponent;
