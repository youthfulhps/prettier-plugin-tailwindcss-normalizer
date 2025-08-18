import React from "react";

// Test each mapping individually
function DebugMappingsTest() {
  return (
    <div>
      {/* Basic operation check */}
      <div className="p-1">Basic: p-1</div>

      {/* Typography individual test */}
      <div className="text-xs">text-xs</div>
      <div className="text-sm">text-sm</div>
      <div className="text-base">text-base</div>

      {/* Tracking test */}
      <div className="tracking-wide">tracking-wide</div>
      <div className="tracking-tight">tracking-tight</div>

      {/* Transform individual test */}
      <div className="rotate-45">rotate-45</div>
      <div className="scale-125">scale-125</div>
      <div className="translate-x-1">translate-x-1</div>

      {/* Border detailed test */}
      <div className="border-t-2">border-t-2</div>
      <div className="border-r-4">border-r-4</div>

      {/* Opacity test */}
      <div className="opacity-50">opacity-50</div>
      <div className="opacity-75">opacity-75</div>
    </div>
  );
}

export default DebugMappingsTest;
