import React, { useState } from "react";
import Select from "react-select";
import type { ImageInfo } from "../types";
import { images } from "../images";

type Props = {
  currentImage: ImageInfo;
  onImageSelect: (image: ImageInfo) => void;
};

const ImageSelector: React.FC<Props> = ({ currentImage, onImageSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const options = images.map((image) => ({
    value: image,
    label: image.name,
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: 10,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const formatOptionLabel = (image) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={image.value.url}
        alt={image.label}
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      {image.label}
    </div>
  );

  const handleSelectChange = (selectedOption) => {
    onImageSelect(selectedOption.value);
  };

  const selectedOption = options.find(
    (option) => option.value.url === currentImage.url
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const newImage = {
        url: fileUrl,
        name: file.name,
        size: file.size,
        filename: file.name,
      };
      setSelectedFile(file);
      onImageSelect(newImage);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        isClearable
      />
      <div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageSelector;
