/**
 * Pick a readable text color for an arbitrary background (category colors are
 * authored as hex in categories.json, so contrast can't be hard-coded).
 * Uses WCAG relative luminance.
 */
export function readableTextOn(hexColor: string): "light" | "dark" {
  const hex = hexColor.replace("#", "");
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;

  const toLinear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const r = toLinear(parseInt(full.slice(0, 2), 16));
  const g = toLinear(parseInt(full.slice(2, 4), 16));
  const b = toLinear(parseInt(full.slice(4, 6), 16));

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Threshold rather than raw max-contrast. On saturated mid-tones (the IAB red,
  // green and indigo) black scores marginally higher on WCAG but reads worse;
  // 0.42 reproduces the light/dark split IAB uses on its own palette, and still
  // keeps dark text on the amber and gold.
  return luminance < 0.42 ? "light" : "dark";
}
