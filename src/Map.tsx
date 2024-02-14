import React, { useState } from "react";
import { RMap, ROSM, RLayerVector, RFeature } from "rlayers";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Style, Text, Fill } from "ol/style";
import type { DataRow } from "./dataTypes";

export const MapComponent = ({ data }: { data: DataRow[] }) => {
  const getLabel = (row: DataRow) => row.vulnerableUserType[0].toUpperCase();
  const [theDataPoint, setTheDataPoint] = useState<DataRow | null>(null);
  const [popupCoords, setPopupCoords] = useState([0, 0]);
  let lat = 0;
  let lon = 0;
  data.forEach((row) => {
    lat += row.latitude;
    lon += row.longitude;
  });
  lat = lat / data.length;
  lon = lon / data.length;

  const toggleVisibleDataPoint = (row: DataRow, event: any) => {
    if (row == theDataPoint) {
      setTheDataPoint(null);
    } else {
      setTheDataPoint(row);
      console.log("Click event?", event);
      setPopupCoords(event.pixel);
    }
  };

  return (
    <section className="map-section">
      {data.length ? (
        <RMap
          className="map"
          initial={{ center: fromLonLat([lon, lat]), zoom: 8 }}
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
              />
            ))}
          </RLayerVector>
        </RMap>
      ) : (
        <div>No data</div>
      )}
      <div className="map-details">
        {theDataPoint ? (
          <div
            className="map-popup"
            style={{
              position: "absolute",
              top: popupCoords[1],
              left: popupCoords[0],
            }}
          >
            {theDataPoint?.crashDate.toDateString()}
            <br />
            {theDataPoint?.cityTownName}
            <br />
            {theDataPoint?.vulnerableUserTypes.join(", ")}
            <br />
            {theDataPoint?.fatalities ? "Fatal" : "Non-fatal"}
            <br />
            {theDataPoint?.weatherConditions}
            <br />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default MapComponent;
