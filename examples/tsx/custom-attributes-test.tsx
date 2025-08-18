import React from "react";

function CustomAttributesTest() {
  return (
    <div>
      {/* 1. Default supported attribute - className */}
      <div className="p-1 m-2">Basic className</div>

      {/* 2. Custom attributes - will these be transformed? */}
      <div
        className="p-1"
        myClassProp="border-[2px] rounded-[4px]"
        data-classes="w-[200px] h-[100px]"
        customTheme="focus:ring-[2px] text-[14px]"
      >
        Custom attribute test
      </div>

      {/* 3. HTML general attributes */}
      <div
        title="This should not be transformed p-[4px]"
        data-tooltip="tooltip p-[4px]"
        aria-label="label p-[4px]"
      >
        General attributes
      </div>
    </div>
  );
}

export default CustomAttributesTest;
