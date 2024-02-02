import React from "react";
import type {
  FilterOption,
  FilterOptionBoolean,
  FilterOptionColor,
  FilterOptionInteger,
  FilterOptionNumber,
  FilterOptionPercentage,
} from "../types";

type FilterOptionProps = {
  option: FilterOption;
  onInput: (name: string, value: boolean | string | number) => void;
  currentValue: boolean | string | number;
};

const FilterOptionComponent: React.FC<FilterOptionProps> = ({
  option,
  onInput,
  currentValue,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      onInput(name, checked);
    } else {
      onInput(name, value);
    }
  };

  switch (option.type) {
    case "integer":
    case "number":
      return (
        <label>
          {option.name}:
          <input
            type="number"
            name={option.name}
            value={currentValue as number}
            min={(option as FilterOptionInteger | FilterOptionNumber).min}
            max={(option as FilterOptionInteger | FilterOptionNumber).max}
            onChange={handleChange}
          />
        </label>
      );
    case "percentage":
      return (
        <label>
          {option.name}:
          <input
            type="range"
            name={option.name}
            value={currentValue as number}
            min="0"
            max="100"
            step=".1"
            onChange={handleChange}
          />
        </label>
      );
    case "color":
      return (
        <label>
          {option.name}:
          <input
            type="color"
            name={option.name}
            value={currentValue as string}
            onChange={handleChange}
          />
        </label>
      );
    case "boolean":
      return (
        <label>
          {option.name}:
          <input
            type="checkbox"
            name={option.name}
            checked={currentValue as boolean}
            onChange={handleChange}
          />
        </label>
      );
    default:
      return null;
  }
};

export default FilterOptionComponent;
