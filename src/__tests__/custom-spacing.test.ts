import {
  normalizeClassName,
  normalizeClassNames,
  setPluginOptions,
} from "../normalizer";

describe("Custom spacing unit", () => {
  afterEach(() => {
    // Reset to default after each test
    setPluginOptions({ customSpacingUnit: 4 });
  });

  describe("8px spacing unit", () => {
    beforeEach(() => {
      setPluginOptions({ customSpacingUnit: 8 });
    });

    it("should normalize padding with 8px unit", () => {
      expect(normalizeClassName("p-[8px]")).toBe("p-1");
      expect(normalizeClassName("p-[16px]")).toBe("p-2");
      expect(normalizeClassName("p-[24px]")).toBe("p-3");
      expect(normalizeClassName("p-[32px]")).toBe("p-4");
      expect(normalizeClassName("p-[64px]")).toBe("p-8");
    });

    it("should normalize margin with 8px unit", () => {
      expect(normalizeClassName("m-[8px]")).toBe("m-1");
      expect(normalizeClassName("m-[16px]")).toBe("m-2");
      expect(normalizeClassName("m-[24px]")).toBe("m-3");
      expect(normalizeClassName("m-[32px]")).toBe("m-4");
    });

    it("should normalize directional padding with 8px unit", () => {
      expect(normalizeClassName("px-[8px]")).toBe("px-1");
      expect(normalizeClassName("py-[16px]")).toBe("py-2");
      expect(normalizeClassName("pt-[24px]")).toBe("pt-3");
      expect(normalizeClassName("pr-[32px]")).toBe("pr-4");
      expect(normalizeClassName("pb-[40px]")).toBe("pb-5");
      expect(normalizeClassName("pl-[48px]")).toBe("pl-6");
    });

    it("should normalize gap with 8px unit", () => {
      expect(normalizeClassName("gap-[8px]")).toBe("gap-1");
      expect(normalizeClassName("gap-[16px]")).toBe("gap-2");
      expect(normalizeClassName("gap-x-[24px]")).toBe("gap-x-3");
      expect(normalizeClassName("gap-y-[32px]")).toBe("gap-y-4");
    });

    it("should normalize width/height with 8px unit", () => {
      expect(normalizeClassName("w-[8px]")).toBe("w-1");
      expect(normalizeClassName("w-[16px]")).toBe("w-2");
      expect(normalizeClassName("h-[24px]")).toBe("h-3");
      expect(normalizeClassName("h-[32px]")).toBe("h-4");
    });

    it("should normalize fractional values for py/my with 8px unit", () => {
      expect(normalizeClassName("py-[4px]")).toBe("py-0.5");
      expect(normalizeClassName("py-[12px]")).toBe("py-1.5");
      expect(normalizeClassName("py-[20px]")).toBe("py-2.5");
      expect(normalizeClassName("my-[4px]")).toBe("my-0.5");
      expect(normalizeClassName("my-[12px]")).toBe("my-1.5");
    });

    it("should not normalize values that don't match 8px scale", () => {
      // 4px doesn't exist in 8px scale (except as 0.5 for py/my)
      expect(normalizeClassName("p-[4px]")).toBe("p-[4px]");
      expect(normalizeClassName("px-[4px]")).toBe("px-[4px]");
      expect(normalizeClassName("m-[4px]")).toBe("m-[4px]");

      // Random values that don't match
      expect(normalizeClassName("p-[7px]")).toBe("p-[7px]");
      expect(normalizeClassName("p-[15px]")).toBe("p-[15px]");
    });

    it("should handle multiple classes with 8px unit", () => {
      const input = "p-[8px] m-[16px] gap-[24px] w-[32px]";
      const expected = "p-1 m-2 gap-3 w-4";
      expect(normalizeClassNames(input)).toBe(expected);
    });

    it("should handle negative values with 8px unit", () => {
      expect(normalizeClassName("-m-[8px]")).toBe("-m-1");
      expect(normalizeClassName("-m-[16px]")).toBe("-m-2");
      expect(normalizeClassName("m-[-8px]")).toBe("-m-1");
      expect(normalizeClassName("m-[-16px]")).toBe("-m-2");
    });
  });

  describe("10px spacing unit", () => {
    beforeEach(() => {
      setPluginOptions({ customSpacingUnit: 10 });
    });

    it("should normalize padding with 10px unit", () => {
      expect(normalizeClassName("p-[10px]")).toBe("p-1");
      expect(normalizeClassName("p-[20px]")).toBe("p-2");
      expect(normalizeClassName("p-[30px]")).toBe("p-3");
      expect(normalizeClassName("p-[40px]")).toBe("p-4");
      expect(normalizeClassName("p-[50px]")).toBe("p-5");
      expect(normalizeClassName("p-[100px]")).toBe("p-10");
    });

    it("should normalize margin with 10px unit", () => {
      expect(normalizeClassName("m-[10px]")).toBe("m-1");
      expect(normalizeClassName("m-[20px]")).toBe("m-2");
      expect(normalizeClassName("m-[30px]")).toBe("m-3");
    });

    it("should normalize fractional values for py/my with 10px unit", () => {
      expect(normalizeClassName("py-[5px]")).toBe("py-0.5");
      expect(normalizeClassName("py-[15px]")).toBe("py-1.5");
      expect(normalizeClassName("py-[25px]")).toBe("py-2.5");
      expect(normalizeClassName("my-[5px]")).toBe("my-0.5");
    });

    it("should not normalize values that don't match 10px scale", () => {
      expect(normalizeClassName("p-[4px]")).toBe("p-[4px]");
      expect(normalizeClassName("p-[8px]")).toBe("p-[8px]");
      expect(normalizeClassName("p-[12px]")).toBe("p-[12px]");
    });
  });

  describe("16px spacing unit", () => {
    beforeEach(() => {
      setPluginOptions({ customSpacingUnit: 16 });
    });

    it("should normalize padding with 16px unit", () => {
      expect(normalizeClassName("p-[16px]")).toBe("p-1");
      expect(normalizeClassName("p-[32px]")).toBe("p-2");
      expect(normalizeClassName("p-[48px]")).toBe("p-3");
      expect(normalizeClassName("p-[64px]")).toBe("p-4");
    });

    it("should normalize margin with 16px unit", () => {
      expect(normalizeClassName("m-[16px]")).toBe("m-1");
      expect(normalizeClassName("m-[32px]")).toBe("m-2");
    });

    it("should normalize fractional values with 16px unit", () => {
      expect(normalizeClassName("py-[8px]")).toBe("py-0.5");
      expect(normalizeClassName("py-[24px]")).toBe("py-1.5");
      expect(normalizeClassName("my-[8px]")).toBe("my-0.5");
    });
  });

  describe("1px spacing unit", () => {
    beforeEach(() => {
      setPluginOptions({ customSpacingUnit: 1 });
    });

    it("should normalize padding with 1px unit", () => {
      expect(normalizeClassName("p-[1px]")).toBe("p-px");
      expect(normalizeClassName("p-[2px]")).toBe("p-2");
      expect(normalizeClassName("p-[4px]")).toBe("p-4");
      expect(normalizeClassName("p-[16px]")).toBe("p-16");
      expect(normalizeClassName("p-[32px]")).toBe("p-32");
    });

    it("should normalize margin with 1px unit", () => {
      expect(normalizeClassName("m-[1px]")).toBe("m-px");
      expect(normalizeClassName("m-[2px]")).toBe("m-2");
      expect(normalizeClassName("m-[16px]")).toBe("m-16");
    });

    it("should normalize directional padding with 1px unit", () => {
      expect(normalizeClassName("px-[16px]")).toBe("px-16");
      expect(normalizeClassName("py-[8px]")).toBe("py-8");
      expect(normalizeClassName("pt-[4px]")).toBe("pt-4");
    });

    it("should normalize gap with 1px unit", () => {
      expect(normalizeClassName("gap-[16px]")).toBe("gap-16");
      expect(normalizeClassName("gap-x-[8px]")).toBe("gap-x-8");
    });
  });

  describe("Default 4px spacing unit", () => {
    it("should work with default 4px when no option is set", () => {
      setPluginOptions({});

      expect(normalizeClassName("p-[4px]")).toBe("p-1");
      expect(normalizeClassName("p-[8px]")).toBe("p-2");
      expect(normalizeClassName("p-[16px]")).toBe("p-4");
      expect(normalizeClassName("m-[4px]")).toBe("m-1");
    });

    it("should work with explicit 4px option", () => {
      setPluginOptions({ customSpacingUnit: 4 });

      expect(normalizeClassName("p-[4px]")).toBe("p-1");
      expect(normalizeClassName("p-[8px]")).toBe("p-2");
      expect(normalizeClassName("p-[16px]")).toBe("p-4");
    });
  });

  describe("Special values across different spacing units", () => {
    it("should handle 0px correctly with any spacing unit", () => {
      setPluginOptions({ customSpacingUnit: 8 });
      expect(normalizeClassName("p-[0px]")).toBe("p-0");
      expect(normalizeClassName("m-[0px]")).toBe("m-0");

      setPluginOptions({ customSpacingUnit: 10 });
      expect(normalizeClassName("p-[0px]")).toBe("p-0");

      setPluginOptions({ customSpacingUnit: 16 });
      expect(normalizeClassName("p-[0px]")).toBe("p-0");
    });

    it("should handle 1px correctly with any spacing unit", () => {
      setPluginOptions({ customSpacingUnit: 8 });
      expect(normalizeClassName("p-[1px]")).toBe("p-px");

      setPluginOptions({ customSpacingUnit: 10 });
      expect(normalizeClassName("p-[1px]")).toBe("p-px");

      setPluginOptions({ customSpacingUnit: 16 });
      expect(normalizeClassName("p-[1px]")).toBe("p-px");
    });
  });

  describe("Real-world example with custom spacing", () => {
    it("should handle a complete component with 8px spacing", () => {
      setPluginOptions({ customSpacingUnit: 8 });

      const input = `
        <div class="p-[16px] m-[8px] gap-[24px]">
          <button class="px-[32px] py-[16px] rounded-[8px]">
            Click me
          </button>
        </div>
      `;

      const output = normalizeClassNames("p-[16px] m-[8px] gap-[24px]");
      expect(output).toBe("p-2 m-1 gap-3");

      const buttonClasses = normalizeClassNames("px-[32px] py-[16px]");
      expect(buttonClasses).toBe("px-4 py-2");
    });

    it("should handle a component with 10px spacing", () => {
      setPluginOptions({ customSpacingUnit: 10 });

      const classes = normalizeClassNames(
        "p-[20px] m-[10px] gap-[30px] w-[100px]"
      );
      expect(classes).toBe("p-2 m-1 gap-3 w-10");
    });
  });
});
