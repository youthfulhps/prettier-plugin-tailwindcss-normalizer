/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      // Example: Custom spacing scale using 8px as the base unit
      spacing: {
        px: "1px",
        0: "0px",
        0.5: "4px", // 8px * 0.5
        1: "8px", // 8px * 1
        1.5: "12px", // 8px * 1.5
        2: "16px", // 8px * 2
        2.5: "20px", // 8px * 2.5
        3: "24px", // 8px * 3
        3.5: "28px", // 8px * 3.5
        4: "32px", // 8px * 4
        5: "40px", // 8px * 5
        6: "48px", // 8px * 6
        7: "56px", // 8px * 7
        8: "64px", // 8px * 8
        9: "72px", // 8px * 9
        10: "80px", // 8px * 10
        11: "88px", // 8px * 11
        12: "96px", // 8px * 12
        14: "112px", // 8px * 14
        16: "128px", // 8px * 16
        20: "160px", // 8px * 20
        24: "192px", // 8px * 24
        28: "224px", // 8px * 28
        32: "256px", // 8px * 32
        36: "288px", // 8px * 36
        40: "320px", // 8px * 40
        44: "352px", // 8px * 44
        48: "384px", // 8px * 48
        52: "416px", // 8px * 52
        56: "448px", // 8px * 56
        60: "480px", // 8px * 60
        64: "512px", // 8px * 64
        72: "576px", // 8px * 72
        80: "640px", // 8px * 80
        96: "768px", // 8px * 96
      },
    },
  },
  plugins: [],
};
