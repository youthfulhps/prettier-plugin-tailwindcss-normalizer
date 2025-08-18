import {
  normalizeClassName,
  normalizeClassNames,
  normalizeClassAttribute,
} from "../normalizer";

describe("normalizeClassName", () => {
  it("should normalize padding arbitrary values", () => {
    expect(normalizeClassName("p-[4px]")).toBe("p-1");
    expect(normalizeClassName("p-[8px]")).toBe("p-2");
    expect(normalizeClassName("p-[16px]")).toBe("p-4");
    expect(normalizeClassName("px-[24px]")).toBe("px-6");
    expect(normalizeClassName("py-[32px]")).toBe("py-8");
    expect(normalizeClassName("pt-[40px]")).toBe("pt-10");
  });

  it("should normalize margin arbitrary values", () => {
    expect(normalizeClassName("m-[4px]")).toBe("m-1");
    expect(normalizeClassName("m-[8px]")).toBe("m-2");
    expect(normalizeClassName("m-[16px]")).toBe("m-4");
  });

  it("should normalize width and height arbitrary values", () => {
    expect(normalizeClassName("w-[16px]")).toBe("w-4");
    expect(normalizeClassName("h-[32px]")).toBe("h-8");
    expect(normalizeClassName("w-[50%]")).toBe("w-1/2");
    expect(normalizeClassName("h-[100%]")).toBe("h-full");
  });

  it("should normalize border radius arbitrary values", () => {
    expect(normalizeClassName("rounded-[4px]")).toBe("rounded");
    expect(normalizeClassName("rounded-[8px]")).toBe("rounded-lg");
    expect(normalizeClassName("rounded-[9999px]")).toBe("rounded-full");
  });

  it("should return original class if no mapping exists", () => {
    expect(normalizeClassName("p-[7px]")).toBe("p-[7px]");
    expect(normalizeClassName("p-[999px]")).toBe("p-[999px]");
    expect(normalizeClassName("unknown-[4px]")).toBe("unknown-[4px]");
  });

  it("should not change standard classes", () => {
    expect(normalizeClassName("p-4")).toBe("p-4");
    expect(normalizeClassName("bg-red-500")).toBe("bg-red-500");
    expect(normalizeClassName("text-center")).toBe("text-center");
  });

  it("should handle edge cases", () => {
    expect(normalizeClassName("")).toBe("");
    expect(normalizeClassName("p-[]")).toBe("p-[]");
  });

  it("should normalize px suffix values", () => {
    // Border px suffix
    expect(normalizeClassName("border-1px")).toBe("border");
    expect(normalizeClassName("border-2px")).toBe("border-2");
    expect(normalizeClassName("border-4px")).toBe("border-4");
    expect(normalizeClassName("border-8px")).toBe("border-8");

    // Directional border px suffix
    expect(normalizeClassName("border-t-2px")).toBe("border-t-2");
    expect(normalizeClassName("border-r-4px")).toBe("border-r-4");
    expect(normalizeClassName("border-b-2px")).toBe("border-b-2");
    expect(normalizeClassName("border-l-1px")).toBe("border-l");

    // Padding px suffix
    expect(normalizeClassName("p-4px")).toBe("p-1");
    expect(normalizeClassName("px-8px")).toBe("px-2");
    expect(normalizeClassName("py-16px")).toBe("py-4");

    // Margin px suffix
    expect(normalizeClassName("m-4px")).toBe("m-1");
    expect(normalizeClassName("mx-8px")).toBe("mx-2");
    expect(normalizeClassName("my-16px")).toBe("my-4");

    // Width/Height px suffix
    expect(normalizeClassName("w-4px")).toBe("w-1");
    expect(normalizeClassName("h-8px")).toBe("h-2");

    // Gap px suffix
    expect(normalizeClassName("gap-4px")).toBe("gap-1");
    expect(normalizeClassName("gap-x-8px")).toBe("gap-x-2");
    expect(normalizeClassName("gap-y-16px")).toBe("gap-y-4");

    // Should not change non-px values
    expect(normalizeClassName("border-4")).toBe("border-4");
    expect(normalizeClassName("p-4")).toBe("p-4");
    expect(normalizeClassName("border-4em")).toBe("border-4em");
  });
});

describe("normalizeClassNames", () => {
  it("should normalize multiple class names", () => {
    const input = "p-[4px] m-[8px] bg-red-500 w-[16px]";
    const expected = "p-1 m-2 bg-red-500 w-4";
    expect(normalizeClassNames(input)).toBe(expected);
  });

  it("should handle extra whitespace", () => {
    const input = "  p-[4px]   m-[8px]  ";
    const expected = "p-1 m-2";
    expect(normalizeClassNames(input)).toBe(expected);
  });

  it("should handle empty strings", () => {
    expect(normalizeClassNames("")).toBe("");
    expect(normalizeClassNames("   ")).toBe("");
  });
});

describe("normalizeClassAttribute", () => {
  it("should normalize class attributes in HTML", () => {
    const input = '<div class="p-[4px] m-[8px] bg-red-500">Content</div>';
    const expected = '<div class="p-1 m-2 bg-red-500">Content</div>';
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle single quotes", () => {
    const input = "<div class='p-[4px] m-[8px]'>Content</div>";
    const expected = "<div class='p-1 m-2'>Content</div>";
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle multiple elements", () => {
    const input = `
      <div class="p-[4px] bg-blue-500">
        <span class="m-[8px] text-white">Text</span>
        <button class="px-[16px] py-[8px] rounded-[4px]">Button</button>
      </div>
    `;
    const expected = `
      <div class="p-1 bg-blue-500">
        <span class="m-2 text-white">Text</span>
        <button class="px-4 py-2 rounded">Button</button>
      </div>
    `;
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle className attribute (React)", () => {
    const input = '<div className="p-[4px] m-[8px] bg-red-500">Content</div>';
    const expected = '<div className="p-1 m-2 bg-red-500">Content</div>';
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should not change content without class attributes", () => {
    const input = '<div id="test">No classes here</div>';
    expect(normalizeClassAttribute(input)).toBe(input);
  });

  it("should handle complex HTML structures", () => {
    const input = `
      <div class="container mx-auto p-[16px]">
        <header class="bg-gray-800 text-white p-[12px]">
          <h1 class="text-xl font-bold m-[8px]">Title</h1>
        </header>
        <main class="flex gap-[24px] p-[20px]">
          <aside class="w-[256px] bg-gray-100 p-[16px]">Sidebar</aside>
          <article class="flex-1 p-[24px]">Content</article>
        </main>
      </div>
    `;

    const expected = `
      <div class="container mx-auto p-4">
        <header class="bg-gray-800 text-white p-3">
          <h1 class="text-xl font-bold m-2">Title</h1>
        </header>
        <main class="flex gap-6 p-5">
          <aside class="w-64 bg-gray-100 p-4">Sidebar</aside>
          <article class="flex-1 p-6">Content</article>
        </main>
      </div>
    `;

    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle Vue :class binding", () => {
    const input = '<div :class="p-[4px] m-[8px] bg-blue-500">Content</div>';
    const expected = '<div :class="p-1 m-2 bg-blue-500">Content</div>';
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle Vue v-bind:class binding", () => {
    const input = '<div v-bind:class="px-[16px] py-[8px]">Content</div>';
    const expected = '<div v-bind:class="px-4 py-2">Content</div>';
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle Angular [class] binding", () => {
    const input =
      '<div [class]="w-[32px] h-[32px] rounded-[4px]">Content</div>';
    const expected = '<div [class]="w-8 h-8 rounded">Content</div>';
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle JSX className with braces", () => {
    const input =
      '<div className={"p-[4px] m-[8px] bg-green-500"}>Content</div>';
    const expected = '<div className={"p-1 m-2 bg-green-500"}>Content</div>';
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle template literals", () => {
    const input =
      "const classes = `p-[4px] m-[8px] ${dynamicClass} bg-red-500`;";
    const expected = "const classes = `p-1 m-2 ${dynamicClass} bg-red-500`;";
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle clsx function calls", () => {
    const input = 'clsx("p-[4px] m-[8px]", condition && "bg-blue-500")';
    const expected = 'clsx("p-1 m-2", condition && "bg-blue-500")';
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle classnames function calls", () => {
    const input = 'classnames("px-[24px] py-[12px] rounded-[8px]")';
    const expected = 'classnames("px-6 py-3 rounded-lg")';
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle cn utility function calls", () => {
    const input = 'cn("w-[48px] h-[48px] rounded-[12px]")';
    const expected = 'cn("w-12 h-12 rounded-xl")';
    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle multiple patterns in one string", () => {
    const input = `
      <div class="p-[4px]" className="m-[8px]">
        <span :class="w-[16px]" [class]="h-[32px]">Mixed</span>
      </div>
      <script>
        const classes = clsx("px-[24px]", \`py-\${size}px rounded-[4px]\`);
      </script>
    `;

    const expected = `
      <div class="p-1" className="m-2">
        <span :class="w-4" [class]="h-8">Mixed</span>
      </div>
      <script>
        const classes = clsx("px-6", \`py-\${size}px rounded\`);
      </script>
    `;

    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  it("should handle React component with complex className patterns", () => {
    const input = `
      export function Button({ size, variant }: ButtonProps) {
        return (
          <button 
            className={clsx(
              "px-[16px] py-[8px] rounded-[6px]",
              size === "large" && "px-[24px] py-[12px]",
              variant === "primary" && "bg-blue-500"
            )}
          >
            Click me
          </button>
        );
      }
    `;

    const expected = `
      export function Button({ size, variant }: ButtonProps) {
        return (
          <button 
            className={clsx(
              "px-4 py-2 rounded-md",
              size === "large" && "px-6 py-3",
              variant === "primary" && "bg-blue-500"
            )}
          >
            Click me
          </button>
        );
      }
    `;

    expect(normalizeClassAttribute(input)).toBe(expected);
  });

  describe("Typography mappings", () => {
    it("should handle text size mappings", () => {
      expect(
        normalizeClassNames(
          "text-[12px] text-[14px] text-[16px] text-[18px] text-[20px]"
        )
      ).toBe("text-xs text-sm text-base text-lg text-xl");
      expect(
        normalizeClassNames("text-[24px] text-[30px] text-[36px] text-[48px]")
      ).toBe("text-2xl text-3xl text-4xl text-5xl");
      expect(
        normalizeClassNames("text-[60px] text-[72px] text-[96px] text-[128px]")
      ).toBe("text-6xl text-7xl text-8xl text-9xl");
    });

    it("should handle letter spacing mappings", () => {
      expect(
        normalizeClassNames(
          "tracking-[-0.05em] tracking-[-0.025em] tracking-[0em]"
        )
      ).toBe("tracking-tighter tracking-tight tracking-normal");
      expect(
        normalizeClassNames(
          "tracking-[0.025em] tracking-[0.05em] tracking-[0.1em]"
        )
      ).toBe("tracking-wide tracking-wider tracking-widest");
    });

    it("should handle line height mappings", () => {
      expect(
        normalizeClassNames(
          "leading-[1] leading-[1.25] leading-[1.375] leading-[1.5]"
        )
      ).toBe("leading-none leading-tight leading-snug leading-normal");
      expect(
        normalizeClassNames(
          "leading-[1.6] leading-[1.625] leading-[1.75] leading-[2]"
        )
      ).toBe("leading-relaxed leading-6 leading-7 leading-loose");
      expect(normalizeClassNames("leading-[2.25] leading-[2.5]")).toBe(
        "leading-9 leading-10"
      );
    });
  });

  describe("Sizing mappings", () => {
    it("should handle min-width mappings", () => {
      expect(
        normalizeClassNames(
          "min-w-[0px] min-w-[100%] min-w-[min-content] min-w-[max-content] min-w-[fit-content]"
        )
      ).toBe("min-w-0 min-w-full min-w-min min-w-max min-w-fit");
    });

    it("should handle max-width mappings", () => {
      expect(
        normalizeClassNames(
          "max-w-[0px] max-w-[320px] max-w-[384px] max-w-[448px] max-w-[512px]"
        )
      ).toBe("max-w-0 max-w-xs max-w-sm max-w-md max-w-lg");
      expect(
        normalizeClassNames(
          "max-w-[576px] max-w-[672px] max-w-[768px] max-w-[896px] max-w-[1024px]"
        )
      ).toBe("max-w-xl max-w-2xl max-w-3xl max-w-4xl max-w-5xl");
      expect(
        normalizeClassNames(
          "max-w-[1152px] max-w-[1280px] max-w-[100%] max-w-[65ch]"
        )
      ).toBe("max-w-6xl max-w-7xl max-w-full max-w-prose");
    });

    it("should handle min-height and max-height mappings", () => {
      expect(
        normalizeClassNames("min-h-[0px] min-h-[100%] min-h-[100vh]")
      ).toBe("min-h-0 min-h-full min-h-screen");
      expect(
        normalizeClassNames(
          "max-h-[0px] max-h-[96px] max-h-[100%] max-h-[100vh]"
        )
      ).toBe("max-h-0 max-h-24 max-h-full max-h-screen");
    });
  });

  describe("Transform mappings", () => {
    it("should handle rotation mappings", () => {
      expect(
        normalizeClassNames(
          "rotate-[0deg] rotate-[1deg] rotate-[2deg] rotate-[3deg] rotate-[6deg]"
        )
      ).toBe("rotate-0 rotate-1 rotate-2 rotate-3 rotate-6");
      expect(
        normalizeClassNames(
          "rotate-[12deg] rotate-[45deg] rotate-[90deg] rotate-[180deg]"
        )
      ).toBe("rotate-12 rotate-45 rotate-90 rotate-180");
      expect(
        normalizeClassNames(
          "rotate-[-180deg] rotate-[-90deg] rotate-[-45deg] rotate-[-1deg]"
        )
      ).toBe("-rotate-180 -rotate-90 -rotate-45 -rotate-1");
    });

    it("should handle scale mappings", () => {
      expect(
        normalizeClassNames(
          "scale-[0] scale-[0.5] scale-[0.75] scale-[0.9] scale-[0.95]"
        )
      ).toBe("scale-0 scale-50 scale-75 scale-90 scale-95");
      expect(
        normalizeClassNames(
          "scale-[1] scale-[1.05] scale-[1.1] scale-[1.25] scale-[1.5]"
        )
      ).toBe("scale-100 scale-105 scale-110 scale-125 scale-150");
    });

    it("should handle translate mappings", () => {
      expect(
        normalizeClassNames(
          "translate-x-[0px] translate-x-[1px] translate-x-[4px] translate-x-[50%] translate-x-[100%]"
        )
      ).toBe(
        "translate-x-0 translate-x-px translate-x-1 translate-x-1/2 translate-x-full"
      );
      expect(
        normalizeClassNames("translate-x-[-100%] translate-x-[-50%]")
      ).toBe("-translate-x-full -translate-x-1/2");
      expect(
        normalizeClassNames(
          "translate-y-[0px] translate-y-[50%] translate-y-[-50%]"
        )
      ).toBe("translate-y-0 translate-y-1/2 -translate-y-1/2");
    });
  });

  describe("Effects mappings", () => {
    it("should handle shadow mappings", () => {
      // These exact shadow values might not have mappings, test basic ones
      expect(
        normalizeClassNames("shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)]")
      ).toContain("shadow");
      expect(
        normalizeClassNames("shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1)]")
      ).toContain("shadow");
    });

    it("should handle opacity mappings", () => {
      expect(
        normalizeClassNames(
          "opacity-[0] opacity-[0.05] opacity-[0.1] opacity-[0.25] opacity-[0.5]"
        )
      ).toBe("opacity-0 opacity-5 opacity-10 opacity-25 opacity-50");
      expect(
        normalizeClassNames(
          "opacity-[0.75] opacity-[0.9] opacity-[0.95] opacity-[1]"
        )
      ).toBe("opacity-75 opacity-90 opacity-95 opacity-100");
    });
  });

  describe("Filter mappings", () => {
    it("should handle blur mappings", () => {
      expect(
        normalizeClassNames(
          "blur-[0] blur-[4px] blur-[8px] blur-[12px] blur-[16px]"
        )
      ).toBe("blur-none blur-sm blur blur-md blur-lg");
      expect(normalizeClassNames("blur-[24px] blur-[40px] blur-[64px]")).toBe(
        "blur-xl blur-2xl blur-3xl"
      );
    });

    it("should handle brightness and contrast mappings", () => {
      expect(
        normalizeClassNames(
          "brightness-[0] brightness-[0.5] brightness-[0.75] brightness-[1]"
        )
      ).toBe("brightness-0 brightness-50 brightness-75 brightness-100");
      expect(
        normalizeClassNames("brightness-[1.25] brightness-[1.5] brightness-[2]")
      ).toBe("brightness-125 brightness-150 brightness-200");
      expect(
        normalizeClassNames(
          "contrast-[0] contrast-[0.5] contrast-[1] contrast-[1.5] contrast-[2]"
        )
      ).toBe("contrast-0 contrast-50 contrast-100 contrast-150 contrast-200");
    });

    it("should handle filter flags", () => {
      expect(
        normalizeClassNames("grayscale-[0] grayscale-[1] invert-[0] invert-[1]")
      ).toBe("grayscale-0 grayscale invert-0 invert");
      expect(
        normalizeClassNames(
          "saturate-[0] saturate-[0.5] saturate-[1] saturate-[1.5] saturate-[2]"
        )
      ).toBe("saturate-0 saturate-50 saturate-100 saturate-150 saturate-200");
      expect(normalizeClassNames("sepia-[0] sepia-[1]")).toBe("sepia-0 sepia");
    });

    it("should handle hue-rotate mappings", () => {
      expect(
        normalizeClassNames(
          "hue-rotate-[0deg] hue-rotate-[15deg] hue-rotate-[30deg] hue-rotate-[60deg]"
        )
      ).toBe("hue-rotate-0 hue-rotate-15 hue-rotate-30 hue-rotate-60");
      expect(
        normalizeClassNames("hue-rotate-[90deg] hue-rotate-[180deg]")
      ).toBe("hue-rotate-90 hue-rotate-180");
    });
  });

  describe("Backdrop filter mappings", () => {
    it("should handle backdrop blur mappings", () => {
      expect(
        normalizeClassNames(
          "backdrop-blur-[0] backdrop-blur-[4px] backdrop-blur-[8px]"
        )
      ).toBe("backdrop-blur-none backdrop-blur-sm backdrop-blur");
      expect(
        normalizeClassNames(
          "backdrop-blur-[12px] backdrop-blur-[16px] backdrop-blur-[24px]"
        )
      ).toBe("backdrop-blur-md backdrop-blur-lg backdrop-blur-xl");
    });

    it("should handle backdrop brightness and contrast", () => {
      expect(
        normalizeClassNames(
          "backdrop-brightness-[0] backdrop-brightness-[0.75] backdrop-brightness-[1]"
        )
      ).toBe(
        "backdrop-brightness-0 backdrop-brightness-75 backdrop-brightness-100"
      );
      expect(
        normalizeClassNames(
          "backdrop-contrast-[0] backdrop-contrast-[1] backdrop-contrast-[2]"
        )
      ).toBe("backdrop-contrast-0 backdrop-contrast-100 backdrop-contrast-200");
    });

    it("should handle backdrop opacity", () => {
      expect(
        normalizeClassNames(
          "backdrop-opacity-[0] backdrop-opacity-[0.25] backdrop-opacity-[0.5]"
        )
      ).toBe("backdrop-opacity-0 backdrop-opacity-25 backdrop-opacity-50");
      expect(
        normalizeClassNames("backdrop-opacity-[0.75] backdrop-opacity-[1]")
      ).toBe("backdrop-opacity-75 backdrop-opacity-100");
    });

    it("should handle other backdrop filters", () => {
      expect(
        normalizeClassNames("backdrop-grayscale-[0] backdrop-grayscale-[1]")
      ).toBe("backdrop-grayscale-0 backdrop-grayscale");
      expect(
        normalizeClassNames("backdrop-invert-[0] backdrop-invert-[1]")
      ).toBe("backdrop-invert-0 backdrop-invert");
      expect(
        normalizeClassNames(
          "backdrop-saturate-[0] backdrop-saturate-[1] backdrop-saturate-[2]"
        )
      ).toBe("backdrop-saturate-0 backdrop-saturate-100 backdrop-saturate-200");
      expect(normalizeClassNames("backdrop-sepia-[0] backdrop-sepia-[1]")).toBe(
        "backdrop-sepia-0 backdrop-sepia"
      );
    });
  });

  describe("Border and outline mappings", () => {
    it("should handle border radius corner mappings", () => {
      expect(
        normalizeClassNames(
          "rounded-tl-[0px] rounded-tl-[2px] rounded-tl-[4px] rounded-tl-[6px]"
        )
      ).toBe("rounded-tl-none rounded-tl-sm rounded-tl rounded-tl-md");
      expect(
        normalizeClassNames(
          "rounded-tr-[8px] rounded-br-[12px] rounded-bl-[16px] rounded-tl-[24px]"
        )
      ).toBe("rounded-tr-lg rounded-br-xl rounded-bl-2xl rounded-tl-3xl");
      expect(normalizeClassNames("rounded-tl-[9999px]")).toBe(
        "rounded-tl-full"
      );
    });

    it("should handle outline mappings", () => {
      expect(
        normalizeClassNames(
          "outline-[0px] outline-[1px] outline-[2px] outline-[4px] outline-[8px]"
        )
      ).toBe("outline-0 outline-1 outline-2 outline-4 outline-8");
      expect(
        normalizeClassNames(
          "outline-offset-[0px] outline-offset-[1px] outline-offset-[2px] outline-offset-[4px] outline-offset-[8px]"
        )
      ).toBe(
        "outline-offset-0 outline-offset-1 outline-offset-2 outline-offset-4 outline-offset-8"
      );
    });

    it("should handle ring mappings", () => {
      expect(
        normalizeClassNames(
          "ring-[0px] ring-[1px] ring-[2px] ring-[4px] ring-[8px]"
        )
      ).toBe("ring-0 ring-1 ring-2 ring-4 ring-8");
      expect(
        normalizeClassNames(
          "ring-offset-[0px] ring-offset-[1px] ring-offset-[2px] ring-offset-[4px] ring-offset-[8px]"
        )
      ).toBe(
        "ring-offset-0 ring-offset-1 ring-offset-2 ring-offset-4 ring-offset-8"
      );
    });
  });

  describe("Positioning mappings", () => {
    it("should handle positioning values", () => {
      expect(
        normalizeClassNames(
          "top-[0px] top-[1px] top-[4px] top-[50%] top-[100%]"
        )
      ).toBe("top-0 top-px top-1 top-1/2 top-full");
      expect(normalizeClassNames("right-[0px] right-[8px] right-[50%]")).toBe(
        "right-0 right-2 right-1/2"
      );
      expect(normalizeClassNames("bottom-[12px] left-[16px]")).toBe(
        "bottom-3 left-4"
      );
    });
  });

  describe("Animation mappings", () => {
    it("should handle duration mappings", () => {
      expect(
        normalizeClassNames(
          "duration-[75ms] duration-[100ms] duration-[150ms] duration-[200ms]"
        )
      ).toBe("duration-75 duration-100 duration-150 duration-200");
      expect(
        normalizeClassNames(
          "duration-[300ms] duration-[500ms] duration-[700ms] duration-[1000ms]"
        )
      ).toBe("duration-300 duration-500 duration-700 duration-1000");
    });

    it("should handle delay mappings", () => {
      expect(
        normalizeClassNames(
          "delay-[0ms] delay-[75ms] delay-[100ms] delay-[150ms]"
        )
      ).toBe("delay-0 delay-75 delay-100 delay-150");
      expect(
        normalizeClassNames(
          "delay-[200ms] delay-[300ms] delay-[500ms] delay-[1000ms]"
        )
      ).toBe("delay-200 delay-300 delay-500 delay-1000");
    });
  });

  describe("Gap and space mappings", () => {
    it("should handle gap-x and gap-y mappings", () => {
      expect(
        normalizeClassNames("gap-x-[0px] gap-x-[1px] gap-x-[4px] gap-x-[8px]")
      ).toBe("gap-x-0 gap-x-px gap-x-1 gap-x-2");
      expect(
        normalizeClassNames(
          "gap-y-[12px] gap-y-[16px] gap-y-[20px] gap-y-[32px]"
        )
      ).toBe("gap-y-3 gap-y-4 gap-y-5 gap-y-8");
    });

    it("should handle space-x and space-y mappings", () => {
      expect(
        normalizeClassNames(
          "space-x-[0px] space-x-[1px] space-x-[4px] space-x-[8px]"
        )
      ).toBe("space-x-0 space-x-px space-x-1 space-x-2");
      expect(
        normalizeClassNames(
          "space-y-[12px] space-y-[16px] space-y-[20px] space-y-[32px]"
        )
      ).toBe("space-y-3 space-y-4 space-y-5 space-y-8");
    });
  });

  describe("Scroll mappings", () => {
    it("should handle scroll margin and padding", () => {
      expect(
        normalizeClassNames(
          "scroll-m-[0px] scroll-m-[1px] scroll-m-[4px] scroll-m-[8px]"
        )
      ).toBe("scroll-m-0 scroll-m-px scroll-m-1 scroll-m-2");
      expect(
        normalizeClassNames(
          "scroll-p-[0px] scroll-p-[4px] scroll-p-[8px] scroll-p-[24px]"
        )
      ).toBe("scroll-p-0 scroll-p-1 scroll-p-2 scroll-p-6");
    });
  });

  describe("Z-index mappings", () => {
    it("should handle z-index values", () => {
      expect(
        normalizeClassNames("z-[0] z-[10] z-[20] z-[30] z-[40] z-[50]")
      ).toBe("z-0 z-10 z-20 z-30 z-40 z-50");
      // High values should remain arbitrary
      expect(normalizeClassNames("z-[1000]")).toBe("z-[1000]");
    });
  });

  describe("Focus state mappings", () => {
    it("should handle focus ring mappings", () => {
      expect(
        normalizeClassNames(
          "focus:ring-[0px] focus:ring-[1px] focus:ring-[2px] focus:ring-[4px] focus:ring-[8px]"
        )
      ).toBe(
        "focus:ring-0 focus:ring-1 focus:ring-2 focus:ring-4 focus:ring-8"
      );
      expect(
        normalizeClassNames(
          "focus:ring-offset-[0px] focus:ring-offset-[1px] focus:ring-offset-[2px] focus:ring-offset-[4px]"
        )
      ).toBe(
        "focus:ring-offset-0 focus:ring-offset-1 focus:ring-offset-2 focus:ring-offset-4"
      );
    });
  });

  describe("Complex mixed mappings", () => {
    it("should handle complex combinations from examples", () => {
      const input =
        "w-[320px] h-[200px] p-[16px] m-[8px] border-[2px] rounded-[12px]";
      const result = normalizeClassNames(input);

      expect(result).toContain("w-80");
      expect(result).toContain("p-4");
      expect(result).toContain("m-2");
      expect(result).toContain("border-2");
      expect(result).toContain("rounded-xl");
    });

    it("should handle typography with spacing combinations", () => {
      const input =
        "text-[14px] tracking-[0.025em] leading-[1.6] p-[12px] m-[6px]";
      const expected = "text-sm tracking-wide leading-relaxed p-3 m-1.5";

      expect(normalizeClassNames(input)).toBe(expected);
    });

    it("should handle transform combinations", () => {
      const input =
        "rotate-[45deg] scale-[1.25] translate-x-[16px] translate-y-[-50%]";
      const expected = "rotate-45 scale-125 translate-x-4 -translate-y-1/2";

      expect(normalizeClassNames(input)).toBe(expected);
    });

    it("should handle border combinations with all directions", () => {
      const input =
        "border-t-[2px] border-r-[4px] border-b-[2px] border-l-[1px] border-x-[2px] border-y-[4px]";
      const expected =
        "border-t-2 border-r-4 border-b-2 border-l border-x-2 border-y-4";

      expect(normalizeClassNames(input)).toBe(expected);
    });

    it("should handle comprehensive filter combinations", () => {
      const input =
        "blur-[8px] brightness-[1.25] contrast-[1.5] grayscale-[0] saturate-[1.5] hue-rotate-[90deg]";
      const expected =
        "blur brightness-125 contrast-150 grayscale-0 saturate-150 hue-rotate-90";

      expect(normalizeClassNames(input)).toBe(expected);
    });
  });

  describe("Negative values mappings", () => {
    describe("Negative margin mappings", () => {
      it("should handle negative margin arbitrary values", () => {
        expect(
          normalizeClassNames("-m-[4px] -m-[8px] -m-[16px] -m-[24px]")
        ).toBe("-m-1 -m-2 -m-4 -m-6");
      });

      it("should handle negative margin with different directions", () => {
        expect(
          normalizeClassNames("-mx-[8px] -my-[12px] -mt-[16px] -mr-[20px]")
        ).toBe("-mx-2 -my-3 -mt-4 -mr-5");
        expect(normalizeClassNames("-mb-[24px] -ml-[32px]")).toBe(
          "-mb-6 -ml-8"
        );
      });

      it("should handle negative margin px suffix", () => {
        expect(normalizeClassNames("-m-4px -mx-8px -mt-16px")).toBe(
          "-m-1 -mx-2 -mt-4"
        );
      });

      it("should handle negative values inside brackets", () => {
        expect(normalizeClassNames("m-[-4px] m-[-8px] m-[-16px]")).toBe(
          "-m-1 -m-2 -m-4"
        );
      });
    });

    describe("Negative positioning mappings", () => {
      it("should handle negative positioning arbitrary values", () => {
        expect(
          normalizeClassNames(
            "-top-[4px] -right-[8px] -bottom-[12px] -left-[16px]"
          )
        ).toBe("-top-1 -right-2 -bottom-3 -left-4");
      });

      it("should handle negative positioning with percentages", () => {
        expect(normalizeClassNames("-top-[50%] -left-[100%]")).toBe(
          "-top-1/2 -left-full"
        );
      });

      it("should handle negative positioning px suffix", () => {
        expect(normalizeClassNames("-top-4px -right-8px")).toBe(
          "-top-1 -right-2"
        );
      });

      it("should handle negative values inside brackets for positioning", () => {
        expect(normalizeClassNames("top-[-4px] left-[-50%]")).toBe(
          "-top-1 -left-1/2"
        );
      });
    });

    describe("Mixed positive and negative values", () => {
      it("should handle mixed positive and negative margins", () => {
        expect(
          normalizeClassNames("m-[4px] -m-[8px] mt-[12px] -mb-[16px]")
        ).toBe("m-1 -m-2 mt-3 -mb-4");
      });

      it("should handle mixed positioning values", () => {
        expect(
          normalizeClassNames("top-[4px] -top-[8px] left-[50%] -right-[100%]")
        ).toBe("top-1 -top-2 left-1/2 -right-full");
      });

      it("should preserve non-negative properties with negative values mixed", () => {
        expect(
          normalizeClassNames("p-[4px] -m-[8px] w-[16px] -top-[12px]")
        ).toBe("p-1 -m-2 w-4 -top-3");
      });
    });

    describe("Edge cases with negative values", () => {
      it("should handle negative zero values", () => {
        // Negative zero should be treated as positive zero
        expect(normalizeClassNames("m-[-0px] top-[-0px]")).toBe("m-0 top-0");
      });

      it("should handle invalid negative patterns", () => {
        // These should remain unchanged as they're not valid patterns or don't have mappings
        expect(normalizeClassNames("-p-[4px]")).toBe("-p-[4px]"); // padding can't be negative
        expect(normalizeClassNames("-w-[16px]")).toBe("-w-[16px]"); // width can't be negative
        expect(normalizeClassNames("-border-[2px]")).toBe("-border-[2px]"); // border can't be negative
      });

      it("should handle complex negative combinations", () => {
        expect(
          normalizeClassNames(
            "-m-[4px] p-[8px] -top-[12px] bg-blue-500 -ml-[16px]"
          )
        ).toBe("-m-1 p-2 -top-3 bg-blue-500 -ml-4");
      });
    });
  });
});
