import type { Filter } from "../types";
import { hexToRGBA } from "../utils";

type MyFilterOptions = {
  /* Define options here, as we will get them
  in our apply function -- this needs to match
  the list of options provided below. I'll provide
  three example options to show one of each type */
  color: string;
  strength: number;
  darkMode: boolean;
};
export const myFilter: Filter<MyFilterOptions> = {
  name: "My Filter",
  apply: (pixels, width, height, options) => {
    // We can now access our options with
    // e.g. options.color, options.strength, etc.

    // Note that "color" options give you a string (e.g. a hex code)
    // and our utils library has a convenience function to convert
    // from RGB (or RGBA) hex codes into an array of numbers (0-255)
    const [r, g, b, a] = hexToRGBA(options.color);
    /* Modify pixels... */
    return pixels;
  },
  options: [
    {
      name: "color",
      type: "color",
      default: "#ff0000",
    },
    {
      name: "strength",
      type: "number",
      default: 50,
      min: 0,
      max: 1000,
    },
    {
      name: "darkMode",
      type: "boolean",
      default: false,
    },
  ],
};
