export type FilterOptionValue = {
  name: string;
  value: number | boolean | string;
};

export type FilterOptionPercentage = {
  name: string;
  default: number;
  type: "percentage";
};
export type FilterOptionNumber = {
  name: string;
  default: number;
  type: "number";
  min?: number;
  max?: number;
};
export type FilterOptionColor = {
  name: string;
  default: string;
  type: "color";
};

export type FilterOptionBoolean = {
  name: string;
  default: boolean;
  type: "boolean";
};

export type FilterOptionInteger = {
  name: string;
  default: number;
  type: "integer";
  min?: number;
  max?: number;
};

export type FilterOption =
  | FilterOptionPercentage
  | FilterOptionNumber
  | FilterOptionColor
  | FilterOptionBoolean
  | FilterOptionInteger;

export type Filter<T = any> = {
  name: string;
  apply: (
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
    options: T
  ) => Uint8ClampedArray;
  options?: FilterOption[];
};

export type ImageInfo = {
  url: string;
  name: string;
  filename?: string;
  attribution?: JSX.Element;
};
