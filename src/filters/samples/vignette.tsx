import type { Filter } from "../../types";
export default {
  name: "Vignette",
  apply: (pixels: Uint8ClampedArray, width: number, height: number) => {
    const MAX_DARKENING = 100;
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const redIndex = row * 4 * width + col * 4;
        const greenIndex = redIndex + 1;
        const blueIndex = redIndex + 2;
        const alphaIndex = redIndex + 3;

        const darken = (percentage: number) => {
          // Our "max" is half of the max darkening value
          // because we might darken a pixel twice when it's
          // in the corner
          pixels[redIndex] -= (MAX_DARKENING / 2) * percentage;
          pixels[greenIndex] -= (MAX_DARKENING / 2) * percentage;
          pixels[blueIndex] -= (MAX_DARKENING / 2) * percentage;
        };

        const rowPercentage = row / height;
        const colPercentage = col / width;
        // Vignette near rows vertically..
        if (rowPercentage < 0.25) {
          // i.e. we start at 1 and we fade
          // to 0 (1 - 0.25 * 4)
          darken(1 - rowPercentage * 4);
        } else if (rowPercentage > 0.75) {
          // we start at 0...

          darken(1 - (1 - rowPercentage) * 4);
        }
        // And also horizontally...
        if (colPercentage < 0.25) {
          // i.e. we start at 1 and we fade
          // to 0 (1 - 0.25 * 4)
          darken(1 - colPercentage * 4);
        } else if (colPercentage > 0.75) {
          // we start at 0...

          darken(1 - (1 - colPercentage) * 4);
        }
      }
    }
    return pixels;
  },
} as Filter;
