import React from "react";

import type { ImageInfo } from "../types";
export const ImageDisplay: React.FC<{ image: ImageInfo }> = ({ image }) => {
  return (
    <figure>
      <figcaption className="bar">{image.attribution}</figcaption>
      <img src={image.url} />
    </figure>
  );
};
