import React from "react";

function TernaryTest({
  isActive,
  condition,
}: {
  isActive: boolean;
  condition: boolean;
}) {
  // Ternary operator in variable assignment
  const dynamicClasses = isActive ? "p-4 bg-blue-500" : "p-2 bg-gray-300";

  // Complex conditional class
  const complexClasses = condition
    ? "p-5 m-2.5 border-2"
    : "p-1 m-0.5 rounded-md";

  return (
    <div className={condition ? "p-5 m-2.5" : "p-1 m-0.5"}>
      <span className={dynamicClasses}>Ternary operator test</span>
      <button className={complexClasses}>Complex conditional styling</button>
    </div>
  );
}

export default TernaryTest;
