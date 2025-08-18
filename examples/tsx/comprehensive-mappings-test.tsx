import React from "react";

// Test all newly added Tailwind mappings
function ComprehensiveMappingsTest() {
  return (
    <div>
      <h1>🎨 Typography test</h1>
      <div
        className="text-sm tracking-wide leading-relaxed"
        style={{ fontSize: 18, letterSpacing: "0.05em" }}
      >
        Typography: text-sm tracking-wide leading-relaxed
      </div>

      <h1>📏 Sizing test</h1>
      <div className="w-80 h-[200px] min-w-[100px] max-w-[600px] min-h-[50px] max-h-[400px]">
        Sizing: w-80 h-48 min-w-0 max-w-xl min-h-0 max-h-96
      </div>

      <h1>🔄 Transform test</h1>
      <div className="rotate-45 scale-125 translate-x-4 -translate-y-1/2">
        Transform: rotate-45 scale-125 translate-x-4 -translate-y-1/2
      </div>

      <h1>✨ Effects test</h1>
      <div className="shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),_0_2px_4px_-2px_rgb(0_0_0_/_0.1)] opacity-80">
        Effects: shadow-md opacity-80
      </div>

      <h1>🎭 Filters test</h1>
      <div className="blur brightness-125 contrast-150 grayscale invert saturate-150 sepia hue-rotate-90">
        Filters: blur brightness-125 contrast-150 grayscale invert saturate-150
        sepia hue-rotate-90
      </div>

      <h1>🌫️ Backdrop Filters test</h1>
      <div className="backdrop-blur-md backdrop-brightness-110 backdrop-contrast-125 backdrop-grayscale backdrop-opacity-75">
        Backdrop: backdrop-blur-md backdrop-brightness-110 backdrop-contrast-125
        backdrop-grayscale backdrop-opacity-75
      </div>

      <h1>🎯 Border & Ring test</h1>
      <div className="border-t-2 border-r-4 border-b-2 border-l rounded-tl-lg rounded-tr-xl rounded-br-md rounded-bl">
        Border: border-t-2 border-r-4 border-b-2 border-l rounded-tl-lg
        rounded-tr-xl rounded-br-md rounded-br
      </div>

      <div className="ring-2 ring-offset-4 outline-2 outline-offset-2">
        Ring & Outline: ring-2 ring-offset-4 outline-2 outline-offset-2
      </div>

      <h1>📍 Positioning test</h1>
      <div className="top-4 right-2 bottom-3 left-5">
        Position: top-4 right-2 bottom-3 left-5
      </div>

      <h1>⏱️ Animation test</h1>
      <div className="duration-300 delay-150">
        Animation: duration-300 delay-150
      </div>

      <h1>🌊 Space & Gap test</h1>
      <div className="gap-x-4 gap-y-2 space-x-3 space-y-5">
        Space: gap-x-4 gap-y-2 space-x-3 space-y-5
      </div>

      <h1>📜 Scroll test</h1>
      <div className="scroll-m-4 scroll-p-6">Scroll: scroll-m-4 scroll-p-6</div>

      <h1>🎚️ Complex combination test</h1>
      <div className="w-96 h-64 p-6 m-4 border-2 rounded-xl shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),_0_4px_6px_-4px_rgb(0_0_0_/_0.1)] backdrop-blur backdrop-opacity-90 rotate-2 scale-105">
        Complex combination: w-96 h-64 p-6 m-4 border-2 rounded-xl shadow-lg
        backdrop-blur backdrop-opacity-90 rotate-2 scale-105
      </div>
    </div>
  );
}

export default ComprehensiveMappingsTest;
