import React from "react";

// Comprehensive px suffix test based on Tailwind CSS border-width documentation
function ComprehensivePxTest() {
  return (
    <div>
      <h1>🎯 Comprehensive px suffix test</h1>

      {/* Border width px suffix - all directions */}
      <div className="border border-t-2 border-r-4 border-b-2 border-l border-x-2 border-y-4">
        Border all directions: border-1px, border-t-2px, border-r-4px,
        border-b-2px, border-l-1px, border-x-2px, border-y-4px
      </div>

      {/* Spacing px suffix */}
      <div className="p-1 px-2 py-3 pt-4 pr-5 pb-6 pl-7">
        Padding: p-4px, px-8px, py-12px, pt-16px, pr-20px, pb-24px, pl-28px
      </div>

      <div className="m-1 mx-2 my-3 mt-4 mr-5 mb-6 ml-7">
        Margin: m-4px, mx-8px, my-12px, mt-16px, mr-20px, mb-24px, ml-28px
      </div>

      {/* Sizing px suffix */}
      <div className="w-4 h-8 min-w-24px max-w-48px min-h-16px max-h-16">
        Sizing: w-16px, h-32px, min-w-24px, max-w-48px, min-h-16px, max-h-64px
      </div>

      {/* Gap & Space px suffix */}
      <div className="gap-1 gap-x-2 gap-y-3 space-x-4 space-y-5">
        Gap & Space: gap-4px, gap-x-8px, gap-y-12px, space-x-16px, space-y-20px
      </div>

      {/* Position px suffix */}
      <div className="top-1 right-2 bottom-3 left-4">
        Position: top-4px, right-8px, bottom-12px, left-16px
      </div>

      {/* Ring & Outline px suffix */}
      <div className="ring-2 ring-offset-4 outline-2 outline-offset-4">
        Ring & Outline: ring-2px, ring-offset-4px, outline-2px,
        outline-offset-4px
      </div>

      {/* Scroll px suffix */}
      <div className="scroll-m-1 scroll-p-2">
        Scroll: scroll-m-4px, scroll-p-8px
      </div>

      {/* Combined test */}
      <div className="border-2 p-2 m-1 w-16 h-12 gap-1">
        Combined: border-2px, p-8px, m-4px, w-64px, h-48px, gap-4px
      </div>

      {/* Mixed with existing classes */}
      <div className="border-4 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2">
        Mixed with standard classes: border-4px + standard classes +
        focus:ring-2px
      </div>
    </div>
  );
}

export default ComprehensivePxTest;
