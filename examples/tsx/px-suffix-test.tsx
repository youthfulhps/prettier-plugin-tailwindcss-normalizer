import React from "react";

// Test px suffix format
function PxSuffixTest() {
  return (
    <div>
      <h1>🎯 px suffix test</h1>

      {/* Border width px suffix */}
      <div className="border border-2 border-4 border-8">
        Border px suffix: border-1px border-2px border-4px border-8px
      </div>

      {/* Directional border px suffix */}
      <div className="border-t-2 border-r-4 border-b-2 border-l">
        Directional border: border-t-2px border-r-4px border-b-2px border-l-1px
      </div>

      {/* Other properties px suffix test */}
      <div className="p-1 m-2 w-4 h-8">
        Other properties: p-4px m-8px w-16px h-32px
      </div>

      {/* Gap, space too */}
      <div className="gap-1 space-x-2">Spacing: gap-4px space-x-8px</div>

      {/* Combined test */}
      <div className="border-2 p-2 m-1 rounded">
        Combined: border-2px p-8px m-4px rounded-4px
      </div>
    </div>
  );
}

export default PxSuffixTest;
