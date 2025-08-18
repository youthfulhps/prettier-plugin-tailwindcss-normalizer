import React from "react";

function NegativeTest() {
  return (
    <div>
      {/* Negative arbitrary values test */}
      <div className="-m-1 -mx-2 -my-3 -mt-4">
        Negative margins arbitrary values
      </div>

      {/* Negative px suffix test */}
      <div className="-m-1 -top-2 -left-4">Negative px suffix</div>

      {/* Negative values inside brackets test */}
      <div className="-m-1 -top-2 -left-1/2">
        Negative values inside brackets
      </div>

      {/* Mixed test */}
      <div className="p-2 -m-3 w-6 -top-4">Mixed positive and negative</div>
    </div>
  );
}

export default NegativeTest;
