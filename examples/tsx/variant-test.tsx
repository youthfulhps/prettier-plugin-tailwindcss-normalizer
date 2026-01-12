import React from "react";

// Variant test - 모든 variant 케이스 테스트
function VariantTest() {
  return (
    <div>
      {/* Responsive variants */}
      <div className="md:p-16 lg:m-8 xl:w-32">Responsive variants</div>

      {/* State variants */}
      <div className="hover:p-16 focus:m-8 active:w-24">State variants</div>

      {/* Dark mode */}
      <div className="dark:p-16 dark:hover:m-8">Dark mode variants</div>

      {/* Group variants */}
      <div className="group">
        <p className="group-hover:p-16 group-focus:m-8">Group variants</p>
      </div>

      {/* Peer variants */}
      <label>
        <input type="checkbox" className="peer sr-only" />
        <span className="peer-checked:p-16 peer-hover:m-8">Peer variants</span>
      </label>

      {/* Has & Not variants */}
      <div className="not-[disabled]:m-8 has-[input:focus]:p-16">
        Has & Not variants
      </div>

      {/* ARIA variants */}
      <button aria-pressed="true" className="aria-pressed:p-16">
        ARIA variants
      </button>

      {/* Data attributes */}
      <div data-status="active" className="data-[status=active]:p-16">
        Data attributes
      </div>

      {/* Arbitrary variants */}
      <div className="[&_input:focus]:m-8 [&:nth-child(3)]:p-16">
        Arbitrary variants
      </div>

      {/* Stacked variants */}
      <div className="md:hover:p-16 dark:md:focus:m-8 lg:dark:group-hover:w-24">
        Stacked variants
      </div>

      {/* Negative values with variants */}
      <div className="hover:-mt-8 md:-m-16 dark:-mx-24">
        Negative values with variants
      </div>

      {/* Values inside brackets with variants */}
      <div className="hover:-top-8 md:-m-16 dark:left-[-50%]">
        Negative values inside brackets with variants
      </div>
    </div>
  );
}

export default VariantTest;
