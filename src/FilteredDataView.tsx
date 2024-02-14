import { useEffect, useState } from "react";
import { HistogramChooser } from "./components/Histogram";
import type { DataRow } from "./dataTypes";
import { AccidentTable } from "./components/AccidentTable";
import MapComponent from "./components/Map";

interface FilteredDataViewProps {
  data: DataRow[];
}

const UNSET = -1;
const ON = 1;
const OFF = 0;
const NVP_TOWNS = [
  "ACTON",
  "AYER",
  "BOXBOROUGH",
  "CARLISLE",
  "CHELMSFORD",
  "CONCORD",
  "CLINTON",
  "DEVENS",
  "DUNSTABLE",
  "SUDBURY",
  "GROTON",
  "HARVARD",
  "HUDSON",
  "LITTLETON",
  "LINCOLN",
  "MAYNARD",
  "WESTFORD",
  "STOW",
  "SHIRLEY",
  "PEPPERELL",
  "TOWNSEND",
];

type FilterState = 0 | 1 | -1;

export const FilteredDataView: React.FC<FilteredDataViewProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<DataRow[]>(data);
  const [onlyFatal, setOnlyFatal] = useState<FilterState>(UNSET);
  const [activeTowns, setActiveTowns] = useState<string[]>(NVP_TOWNS);
  const [showRawData, setShowRawData] = useState<boolean>(false);
  const towns: string[] = [];
  data.forEach((row) => {
    if (!towns.includes(row.cityTownName)) {
      towns.push(row.cityTownName);
    }
  });
  towns.sort();
  useEffect(() => {
    let subset = data;
    if (onlyFatal === UNSET) {
      subset = data;
    } else if (onlyFatal === ON) {
      subset = data.filter((row) => row.fatalities > 0);
    } else {
      subset = data.filter((row) => row.fatalities === 0);
    }
    if (activeTowns.length) {
      subset = subset.filter((row) => activeTowns.includes(row.cityTownName));
    }
    setFilteredData(subset);
  }, [onlyFatal, activeTowns, data]);

  const toggleTown = (town: string) => {
    if (activeTowns.includes(town)) {
      setActiveTowns(activeTowns.filter((t) => t !== town));
    } else {
      setActiveTowns([...activeTowns, town]);
    }
  };

  return (
    <main>
      <div>
        <button
          className={onlyFatal === ON ? "active" : "inactive"}
          onClick={() => setOnlyFatal(ON)}
        >
          Only Fatal
        </button>
        <button
          className={onlyFatal === OFF ? "active" : "inactive"}
          onClick={() => setOnlyFatal(OFF)}
        >
          Not Fatal
        </button>
        <button
          className={onlyFatal === UNSET ? "active" : "inactive"}
          onClick={() => setOnlyFatal(UNSET)}
        >
          All
        </button>
      </div>
      <div>
        <button
          className={activeTowns == NVP_TOWNS ? "active" : "inactive"}
          onClick={() => setActiveTowns(NVP_TOWNS)}
        >
          NVP Riding Area
        </button>
        <button
          className={activeTowns.length === 0 ? "active" : "inactive"}
          onClick={() => setActiveTowns([])}
        >
          All Towns
        </button>
      </div>

      <details>
        <summary>Filter by Town</summary>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gridTemplateRows: "repeat(auto-fill, minmax(32px, 1fr))",
            gap: 3,
          }}
        >
          {towns.map((town) => {
            return (
              <button
                key={town}
                className={activeTowns.includes(town) ? "active" : "inactive"}
                onClick={() => toggleTown(town)}
              >
                {town}
              </button>
            );
          })}
        </div>
      </details>
      <div>
        <p>Filtered to {filteredData.length} rows.</p>
        <HistogramChooser data={filteredData} />
      </div>
      <h2>Map</h2>
      <MapComponent data={filteredData} />
      <details>
        <summary>See Accidents</summary>
        <button onClick={() => setShowRawData(!showRawData)}>
          {showRawData ? "Hide" : "Show"} Data for all {filteredData.length}{" "}
          accidents
        </button>
        {showRawData && <AccidentTable data={filteredData} />}
      </details>
    </main>
  );
};
