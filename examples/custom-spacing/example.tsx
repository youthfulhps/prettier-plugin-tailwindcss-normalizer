// Before formatting with customSpacingUnit: 8
export function Button() {
  return (
    <button className="px-[32px] py-[16px] m-[8px] gap-[24px]">
      Click me
    </button>
  );
}

// After formatting with customSpacingUnit: 8
// The arbitrary values are normalized based on the 8px scale
export function ButtonFormatted() {
  return <button className="px-4 py-2 m-1 gap-3">Click me</button>;
}

// Explanation:
// With customSpacingUnit: 8
// - px-[32px] → px-4  (32px / 8px = 4)
// - py-[16px] → py-2  (16px / 8px = 2)
// - m-[8px]   → m-1   (8px / 8px = 1)
// - gap-[24px] → gap-3 (24px / 8px = 3)

// Compare with default (customSpacingUnit: 4)
// - px-[16px] → px-4  (16px / 4px = 4)
// - py-[8px]  → py-2  (8px / 4px = 2)
// - m-[4px]   → m-1   (4px / 4px = 1)
// - gap-[12px] → gap-3 (12px / 4px = 3)
