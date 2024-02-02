import { useEffect, useState } from "react";
import "./App.css";
import ImageFilterChooser from "./components/ImageFilterChooser";
import filters from "./filters";
import type { Filter, ImageInfo } from "./types";
import { images } from "./images";
import { ImageDisplay } from "./components/ImageDisplay";
import { FilteredImageDisplay } from "./components/FilteredImageDisplay";
import ImageSelector from "./components/ImageSelector";
import FilterOptionComponent from "./components/FilterOption";
const defaultImage = images[0];
const App = () => {
  const [filter, setFilter] = useState<Filter | null>(filters[0]);
  const [image, setImage] = useState<ImageInfo>(defaultImage);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [filterOptions, setFilterOptions] = useState<{
    [key: string]: boolean | string | number;
  }>({});

  useEffect(() => {
    let newOptions: { [key: string]: boolean | string | number } = {};
    if (filter && filter.options) {
      for (let o of filter.options) {
        newOptions[o.name] = o.default;
      }
    }
    setFilterOptions(newOptions);
  }, [filter]);

  const getSize = (width: number, height: number) => {
    setWidth(width);
    setHeight(height);
  };

  const setFilterOption = (name: string, value: boolean | string | number) => {
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  return (
    <main>
      <nav>
        <div>
          Filter: <ImageFilterChooser onInput={setFilter} />
        </div>
        <div>
          Image:
          <ImageSelector onImageSelect={setImage} currentImage={image} />
        </div>
      </nav>
      <h1>
        Filtering {image.name} image &nbsp;
        {(width && (
          <div className="size">
            ({width}x{height})
          </div>
        )) ||
          ""}{" "}
      </h1>
      <section className="options">
        {filter &&
          filter.options &&
          filter.options.map((option) => (
            <FilterOptionComponent
              currentValue={filterOptions[option.name]}
              option={option}
              onInput={setFilterOption}
            />
          ))}
      </section>
      <section className="side-by-side">
        <div>
          <h2>Original</h2>
          {image ? <ImageDisplay image={image} /> : "No image selected..."}
        </div>
        <div>
          <h2>Filtered</h2>
          {filter && image ? (
            <FilteredImageDisplay
              image={image}
              filter={filter}
              filterOptions={filterOptions}
              onImageLoad={getSize}
            />
          ) : (
            "waiting on filter/image..."
          )}
        </div>
      </section>
    </main>
  );
};

export default App;
