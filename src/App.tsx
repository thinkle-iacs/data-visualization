import papa from "papaparse";
import React, { useEffect, useState } from "react";
import { HistogramChooser } from "./components/Histogram";
import { parseDataRow } from "./dataTypes";
import type { DataRow } from "./dataTypes";
import { FilteredDataView } from "./FilteredDataView";

import "./App.css";

const App = () => {
  const [data, setData] = useState<DataRow[]>([]);
  useEffect(() => {
    const getData = async () => {
      const csvFileUrl = "/data/traffic-data-vru.csv";
      let response = await fetch(csvFileUrl);
      console.log("Got response!", response);
      let text = await response.text();
      console.log("Parsed text!", text);
      let result = await papa.parse(text, { header: true });
      console.log("Parsed result!", result);
      let parsedData = [];
      for (let i = 0; i < result.data.length; i++) {
        try {
          parsedData.push(parseDataRow(result.data[i]));
        } catch (err) {
          console.log("Ignoring bad data row", result.data[i], err);
        }
      }
      let keys = new Set();
      parsedData = parsedData.filter((row) => {
        if (keys.has(row.crashNumber)) {
          return false;
        }
        keys.add(row.crashNumber);
        return true;
      });
      console.log("Setting data => ", parsedData);
      setData(parsedData);
    };
    getData();
  }, []);

  return (
    <main>
      <h1>Data Viz with React</h1>
      <p>Loaded data: {data.length}</p>
      <FilteredDataView data={data} />
    </main>
  );
};

export default App;
