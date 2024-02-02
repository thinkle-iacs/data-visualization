import React from "react";
import Select from "react-select";
import filters from "../filters";
import type { Filter } from "../types";

interface ImageFilterChooserProps {
  onInput: (selectedFilter: Filter | null) => void;
}

const ImageFilterChooser: React.FC<ImageFilterChooserProps> = ({ onInput }) => {
  const options = filters.map((filter) => ({
    value: filter,
    label: filter.name,
  }));

  const handleSelectChange = (selectedOption) => {
    onInput(selectedOption ? selectedOption.value : null);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      padding: 20,
    }),
    // Add other custom styles if needed
  };

  return (
    <main>
      <Select
        onChange={handleSelectChange}
        options={options}
        styles={customStyles}
        isClearable
        isSearchable
      />
    </main>
  );
};

export default ImageFilterChooser;
