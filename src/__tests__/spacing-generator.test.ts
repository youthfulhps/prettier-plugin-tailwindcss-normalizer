import { generateSpacingMappings } from "../utils/spacing-generator";

describe("generateSpacingMappings", () => {
  describe("default spacing unit (4px)", () => {
    it("should generate correct mappings for default 4px unit", () => {
      const mappings = generateSpacingMappings(4);

      expect(mappings.px?.["4px"]).toBe("px-1");
      expect(mappings.px?.["8px"]).toBe("px-2");
      expect(mappings.px?.["16px"]).toBe("px-4");
      expect(mappings.p?.["4px"]).toBe("p-1");
      expect(mappings.m?.["4px"]).toBe("m-1");
    });
  });

  describe("custom spacing unit (8px)", () => {
    it("should generate correct mappings for 8px unit", () => {
      const mappings = generateSpacingMappings(8);

      // With 8px base unit:
      // px-1 should map to 8px
      // px-2 should map to 16px
      // px-4 should map to 32px
      expect(mappings.px?.["8px"]).toBe("px-1");
      expect(mappings.px?.["16px"]).toBe("px-2");
      expect(mappings.px?.["32px"]).toBe("px-4");
      expect(mappings.px?.["64px"]).toBe("px-8");
    });

    it("should generate correct mappings for padding with 8px unit", () => {
      const mappings = generateSpacingMappings(8);

      expect(mappings.p?.["8px"]).toBe("p-1");
      expect(mappings.p?.["16px"]).toBe("p-2");
      expect(mappings.p?.["24px"]).toBe("p-3");
      expect(mappings.p?.["32px"]).toBe("p-4");
    });

    it("should generate correct mappings for margin with 8px unit", () => {
      const mappings = generateSpacingMappings(8);

      expect(mappings.m?.["8px"]).toBe("m-1");
      expect(mappings.m?.["16px"]).toBe("m-2");
      expect(mappings.m?.["24px"]).toBe("m-3");
    });
  });

  describe("custom spacing unit (10px)", () => {
    it("should generate correct mappings for 10px unit", () => {
      const mappings = generateSpacingMappings(10);

      expect(mappings.px?.["10px"]).toBe("px-1");
      expect(mappings.px?.["20px"]).toBe("px-2");
      expect(mappings.px?.["30px"]).toBe("px-3");
      expect(mappings.px?.["40px"]).toBe("px-4");
    });
  });

  describe("custom spacing unit (1px)", () => {
    it("should generate correct mappings for 1px unit", () => {
      const mappings = generateSpacingMappings(1);

      // With 1px base unit:
      // px-1 should map to 1px
      // px-2 should map to 2px
      // px-16 should map to 16px
      expect(mappings.px?.["1px"]).toBe("px-px"); // Special case: 1px always maps to px-px
      expect(mappings.px?.["2px"]).toBe("px-2");
      expect(mappings.px?.["16px"]).toBe("px-16");
      expect(mappings.px?.["32px"]).toBe("px-32");
    });

    it("should generate correct mappings for padding with 1px unit", () => {
      const mappings = generateSpacingMappings(1);

      expect(mappings.p?.["1px"]).toBe("p-px");
      expect(mappings.p?.["4px"]).toBe("p-4");
      expect(mappings.p?.["8px"]).toBe("p-8");
      expect(mappings.p?.["16px"]).toBe("p-16");
    });
  });

  describe("fractional values", () => {
    it("should include fractional values only for py and my", () => {
      const mappings = generateSpacingMappings(4);

      // py and my should have fractional values
      expect(mappings.py?.["2px"]).toBe("py-0.5");
      expect(mappings.py?.["6px"]).toBe("py-1.5");
      expect(mappings.my?.["2px"]).toBe("my-0.5");
      expect(mappings.my?.["6px"]).toBe("my-1.5");

      // px should NOT have fractional values
      expect(mappings.px?.["2px"]).toBeUndefined();
      expect(mappings.px?.["6px"]).toBeUndefined();
    });

    it("should generate correct fractional values with 8px unit", () => {
      const mappings = generateSpacingMappings(8);

      expect(mappings.py?.["4px"]).toBe("py-0.5");
      expect(mappings.py?.["12px"]).toBe("py-1.5");
      expect(mappings.py?.["20px"]).toBe("py-2.5");
    });
  });

  describe("all spacing prefixes", () => {
    it("should generate mappings for all spacing-related prefixes", () => {
      const mappings = generateSpacingMappings(4);

      const expectedPrefixes = [
        "p",
        "px",
        "py",
        "pt",
        "pr",
        "pb",
        "pl",
        "ps",
        "pe",
        "m",
        "mx",
        "my",
        "mt",
        "mr",
        "mb",
        "ml",
        "ms",
        "me",
        "gap",
        "gap-x",
        "gap-y",
        "space-x",
        "space-y",
        "w",
        "h",
        "size",
        "min-w",
        "max-w",
        "min-h",
        "max-h",
        "top",
        "right",
        "bottom",
        "left",
        "scroll-m",
        "scroll-p",
      ];

      expectedPrefixes.forEach((prefix) => {
        expect(mappings[prefix]).toBeDefined();
      });
    });
  });

  describe("special values", () => {
    it("should handle 0px correctly", () => {
      const mappings = generateSpacingMappings(8);

      expect(mappings.px?.["0px"]).toBe("px-0");
      expect(mappings.p?.["0px"]).toBe("p-0");
      expect(mappings.m?.["0px"]).toBe("m-0");
    });

    it("should handle 1px correctly", () => {
      const mappings = generateSpacingMappings(8);

      expect(mappings.px?.["1px"]).toBe("px-px");
      expect(mappings.p?.["1px"]).toBe("p-px");
    });
  });
});
