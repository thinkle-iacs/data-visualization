/* Take a 6 or 8 digit hex code and convert it into an RGBA string */
export const hexToRGBA: (hex: string) => [number, number, number, number] = (
  hex
) => {
  if (hex[0] === "#") {
    hex = hex.substring(1);
  }
  // If we have a 6 digit hex code, we need to add the alpha channel
  if (hex.length === 6) {
    hex = hex + "ff";
  }

  // Now we can split the hex code into 4 parts
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  let a = parseInt(hex.slice(6, 8), 16);

  return [r, g, b, a];
};

export const getIndexer = (
  pixels: Uint8ClampedArray,
  width: number,
  height: number
) => {
  return (row: number, col: number) => {
    const redIndex = row * 4 * width + col * 4;
    const greenIndex = redIndex + 1;
    const blueIndex = redIndex + 2;
    const alphaIndex = redIndex + 3;
    return [redIndex, greenIndex, blueIndex, alphaIndex];
  };
};

export const getPixelInfo = (index: number, width: number) => {
  // Each pixel has 4 components (RGBA), so the actual pixel index is:
  const pixelIndex = Math.floor(index / 4);

  // The row and column can be determined from the pixelIndex
  const row = Math.floor(pixelIndex / width);
  const col = pixelIndex % width;

  // Determine the channel (R, G, B, A) based on the remainder of index / 4
  const channels: ["red", "green", "blue", "alpha"] = [
    "red",
    "green",
    "blue",
    "alpha",
  ];
  const channel = channels[index % 4];

  return {
    row,
    col,
    channel,
  };
};

/* /ht: https://www.30secondsofcode.org/js/s/rgb-to-hsl/ */
export const RGBToHSL = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};
