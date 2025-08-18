import React from "react";

// Simple px suffix test
function SimplePxTest() {
  return (
    <div>
      {/* Direct className */}
      <div className="border-4 p-2 m-1">Direct px suffix test</div>

      {/* String literal in braces */}
      <div className={"border-2 p-1"}>Braces px suffix test</div>
    </div>
  );
}

export default SimplePxTest;
