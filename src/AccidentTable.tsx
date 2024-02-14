import { useEffect, useState } from "react";
import { HistogramChooser } from "./components/Histogram";
import type { DataRow } from "./dataTypes";

interface FilteredDataViewProps {
  data: DataRow[];
}

export const AccidentTable: React.FC<FilteredDataViewProps> = ({ data }) => {
  let fields = [
    {
      name: "City/Town",
      key: "cityTownName",
      toString: (name: string) => name,
    },
    {
      name: "Date",
      key: "crashDate",
      toString: (date: Date) => date.toDateString(),
    },
    {
      name: "Fatalities",
      key: "fatalities",
      toString: (num: number) => num.toString(),
    },
    {
      name: "Injuries",
      key: "nonFatalInjuries",
      toString: (num: number) => num.toString(),
    },
    {
      name: "Weather",
      key: "weatherConditions",
      toString: (weather: string) => weather,
    },
    {
      name: "Vulnerable Road User",
      key: "vulnerableUserType",
      toString: (type: string) => type,
    },
  ];
  console.log("Table data:", data);
  return (
    <table>
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field.key}>{field.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.crashNumber}>
            {fields.map((field) => (
              <td key={field.key}>{field.toString(row[field.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
