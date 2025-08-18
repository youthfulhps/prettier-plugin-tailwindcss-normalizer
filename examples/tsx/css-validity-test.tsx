import React from "react";

function CssValidityTest() {
  return (
    <div>
      {/* 유효한 음수값들 - 변환됨 ✅ */}
      <div className="-m-2 -top-2 -left-2">Valid negative values</div>

      {/* 무효한 음수값들 - 변환 안됨 ❌ */}
      <div className="-p-[8px] -w-[8px] -border-[2px]">
        Invalid negative values (CSS spec violation)
      </div>
    </div>
  );
}

export default CssValidityTest;
