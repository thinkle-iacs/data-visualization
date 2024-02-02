import type { Filter } from "../types";

export const myFilter: Filter = {
  name: "My Filter",
  apply: (pixels, width, height) => {
    /* Modify pixels... */
    return pixels;
  },
};
