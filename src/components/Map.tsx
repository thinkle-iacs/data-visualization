import React, { useState } from "react";
import { RMap, ROSM, RLayerVector, RFeature, ROverlay } from "rlayers";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Style, Text, Fill } from "ol/style";
import type { DataRow } from "../dataTypes";
const IACS_LAT = 42.6586249;
const IACS_LON = -71.4107149;
export const MapComponent = ({ data }: { data: DataRow[] }) => {
  const getLabel = (row: DataRow) => row.vulnerableUserType[0].toUpperCase();
  const [theDataPoint, setTheDataPoint] = useState<DataRow | null>(null);

  const toggleVisibleDataPoint = (row: DataRow, event: any) => {
    if (row == theDataPoint) {
      setTheDataPoint(null);
    } else {
      setTheDataPoint(row);
    }
  };

  return (
    <section className="map-section">
      {data.length ? (
        <RMap
          className="map"
          initial={{ center: fromLonLat([IACS_LON, IACS_LAT]), zoom: 11 }}
        >
          <ROSM />
          <RLayerVector>
            {data.map((row, idx) => (
              <RFeature
                onClick={(event) => toggleVisibleDataPoint(row, event)}
                key={idx}
                geometry={new Point(fromLonLat([row.longitude, row.latitude]))}
                style={
                  new Style({
                    text: new Text({
                      text: getLabel(row),
                      fill: row.fatalities
                        ? new Fill({ color: "#f00" })
                        : new Fill({ color: "#000" }),
                      scale: 1.5,
                      backgroundFill:
                        row == theDataPoint
                          ? new Fill({ color: "#ccc" })
                          : undefined,
                    }),
                  })
                }
              >
                <ROverlay>
                  {theDataPoint === row ? (
                    <div
                      className="map-popup"
                      style={{
                        position: "absolute",
                        padding: 8,
                        left: -90,
                        top: 10,
                        width: 180,
                        backgroundColor: "#fff8",
                        color: "#222",
                      }}
                    >
                      {theDataPoint.crashDate.toDateString()}
                      <br />
                      {theDataPoint.cityTownName}
                      <br />
                      {theDataPoint.vulnerableUserTypes.join(", ")}
                      <br />
                      {theDataPoint.fatalities ? "Fatal" : "Non-fatal"}
                      <br />
                      {theDataPoint.weatherConditions}
                      <br />
                      <a
                        href={`https://www.google.com/maps?layer=c&cbll=${row.latitude},${row.longitude}`}
                        target="_STREET"
                      >
                        Open Google Street View
                      </a>
                    </div>
                  ) : (
                    <div />
                  )}
                </ROverlay>
              </RFeature>
            ))}
          </RLayerVector>
        </RMap>
      ) : (
        <div>No data</div>
      )}
    </section>
  );
};

export default MapComponent;
