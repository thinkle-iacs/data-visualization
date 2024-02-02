import type { Filter } from "../../types";
import { hexToRGBA } from "../../utils";

/*
  Define types for any options we want. To make these options available,
  we will also have to define them in the options array below.
*/
type GridFilterOptions = {
  stripes: number;
  rowColor: string;
  colColor: string;
  strength: number /* percentage of color to add */;
};

/*
  A convenience function to give a weighted average of two numbers,
  used for our "color mixing" -- so we can add a percentage of B to A.
*/
const mix = (a: number, b: number, percentageB: number) => {
  return a * (1 - percentageB) + b * percentageB;
};

const gridFilter: Filter<GridFilterOptions> = {
  name: "Grid",
  apply: (pixels, width, height, options) => {
    let nstripes = options.stripes; // number of stripes
    const [rowRed, rowGreen, rowBlue] = hexToRGBA(options.rowColor); // color to add to rows
    const [colRed, colGreen, colBlue] = hexToRGBA(options.colColor); // color to add to columns
    let stripeWidth = width / nstripes; // calculate width of vertical stripe
    let stripeHeight = height / nstripes; // calculate height of horizontal stripe
    const strength = options.strength / 100; // convert percentage to decimal
    console.log("gridFilter got", options);
    console.log("Row values are ", rowRed, rowGreen, rowBlue);
    // Now iterate through each row and columns...
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        // Get the indices of R,G,B,A pixels
        // for row and col
        const redIndex = row * 4 * width + col * 4;
        const greenIndex = redIndex + 1;
        const blueIndex = redIndex + 2;
        const alphaIndex = redIndex + 3;

        // Now we want to draw stripes -- figure out if we're "on" or "off"
        let inHorizontalStripe = Math.floor(row / stripeHeight) % 2;
        let inVerticalStripe = Math.floor(col / stripeWidth) % 2;

        // Apply special logic for horizontal and vertical striping...
        if (inHorizontalStripe) {
          // make redder...
          pixels[redIndex] = mix(pixels[redIndex], rowRed, strength);
          pixels[greenIndex] = mix(pixels[greenIndex], rowGreen, strength);
          pixels[blueIndex] = mix(pixels[blueIndex], rowBlue, strength);
        }
        if (inVerticalStripe) {
          // Make bluier
          pixels[redIndex] = mix(pixels[redIndex], colRed, strength);
          pixels[greenIndex] = mix(pixels[greenIndex], colGreen, strength);
          pixels[blueIndex] = mix(pixels[blueIndex], colBlue, strength);
        }
      }
    }

    return pixels;
  },
  options: [
    {
      name: "stripes",
      type: "integer",
      default: 10,
      min: 2,
    },
    {
      name: "rowColor",
      type: "color",
      default: "#ff0000",
    },
    {
      name: "colColor",
      type: "color",
      default: "#0000ff",
    },
    {
      name: "strength",
      type: "percentage",
      default: 15,
    },
  ],
};

export default gridFilter;
