import React from "react";

// Simple px suffix test
function SimplePxTest() {
  return (
    <div>
      {/* Direct className */}
      <div className="m-1 border-4 p-2">Direct px suffix test</div>

      {/* String literal in braces */}
      <div className={"border-2 p-1"}>Braces px suffix test</div>
    </div>
  );
}

export default SimplePxTest;
