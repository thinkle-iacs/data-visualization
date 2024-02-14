import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import type { DataRow } from "../dataTypes";
const Histogram = ({ data, field }) => {
  // Convert your data to a format suitable for the histogram
  const histogramData = processDataForHistogram(data, field);

  return (
    <BarChart width={1200} height={400} data={histogramData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
   
      <Bar dataKey="count" fill="#8884d8">
        <LabelList dataKey="count" position="top" />
      </Bar>
    </BarChart>
  );
};

interface HistogramChooserProps {
  data: DataRow[];
}
export const HistogramChooser: React.FC<HistogramChooserProps> = ({ data }) => {
  const fields = [
    "cityTownName",
    "driverAge",
    "crashTime",
    "crashHour",
    "crashMonth",
    "fatalities",
    "pedestrians",
    "cyclists",
    "skateboarders",
    "otherVRU",
    "vulnerableUserType",
    "nonFatalInjuries",
  ];
  const [selectedField, setSelectedField] = useState(fields[0]);

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  return (
    <div>
      <select onChange={handleFieldChange} value={selectedField}>
        {fields.map((field) => (
          <option key={field}>{field}</option>
        ))}
        {/* Add more options based on your data */}
      </select>

      <Histogram data={data} field={selectedField} />
    </div>
  );
};

// Utility function to process data for histogram based on the selected field
const processDataForHistogram = (data, field) => {
  let counts: { [key: string]: number } = {};
  for (let i = 0; i < data.length; i++) {
    let value = data[i][field];
    if (!counts[value]) {
      counts[value] = 1;
    } else {
      counts[value]++;
    }
  }
  let returnArray = [];
  for (let key in counts) {
    returnArray.push({ name: key, count: counts[key] });
  }
  returnArray.sort((a, b) => a.name > b.name ? 1 : -1);
  return returnArray;
};
