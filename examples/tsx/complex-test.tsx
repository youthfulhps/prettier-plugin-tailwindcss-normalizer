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
    <div className="min-h-screen p-1 -m-4 px-1">
      {/* Various patterns */}
      <div
        className={cx(
          "px-4 py-2 rounded-md",
          "focus:ring-2 focus:ring-blue-500"
        )}
      >
        <span className={"bg-white p-3 m-2"}>String inside braces</span>
      </div>

      {/* Template literal */}
      <div
        className={`w-[200px] h-[100px] border border-gray-300${
          true ? "p-5" : "p-[10px] px-5"
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
      <div className="bg-red-100 border-l-4 border-red-500 p-4">
        {errorMessage}
      </div>

      <div
        className={
          true ? "p-4" : "p-[10px]" // Now it transforms!
        }
      >
        <h1 className="text-xl font-bold">Ternary operator issue solved!</h1>
        <p>Now it works perfectly with format on save.</p>
      </div>
    </div>
  );
}

export default ComplexComponent;
