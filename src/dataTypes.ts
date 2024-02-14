export interface RawCrashDataRow {
  "Crash Number": string;
  "City Town Name": string;
  "Crash Date": string;
  "Crash Severity": string;
  "Crash Status": string;
  "Crash Time": string;
  "Crash Year": string;
  "Max Injury Severity Reported": string;
  "Number of Vehicles": string;
  "Police Agency Type": string;
  "State Police Troop": string;
  "Age of Driver - Youngest Known": string;
  "Age of Driver - Oldest Known": string;
  "Age of Vulnerable User - Youngest Known": string;
  "Age of Vulnerable User - Oldest Known": string;
  "Crash Hour": string;
  "Driver Contributing Circumstances (All Drivers)": string;
  "Driver Distracted By (All Vehicles)": string;
  "First Harmful Event": string;
  "Is Geocoded": string;
  "Light Conditions": string;
  "Manner of Collision": string;
  "MassDOT District": string;
  "Vulnerable User Action (All Persons)": string;
  "Vulnerable User Location (All Persons)": string;
  "Vulnerable User Type (All Persons)": string;
  "RMV Document Numbers": string;
  "Road Surface Condition": string;
  "Roadway Junction Type": string;
  "RPA Abbreviation": string;
  "Total Fatalities": string;
  "Total Non-Fatal Injuries": string;
  "Traffic Control Device Type": string;
  "Trafficway Description": string;
  "Vehicle Actions Prior to Crash (All Vehicles)": string;
  "Vehicle Configuration (All Vehicles)": string;
  "Vehicle Emergency Use (All Vehicles)": string;
  "Vehicle Towed From Scene (All Vehicles)": string;
  "Vehicle Travel Directions (All Vehicles)": string;
  "Weather Conditions": string;
  "County Name": string;
  "Crash Report IDs": string;
  "FMCSA Reportable (All Vehicles)": string;
  "FMCSA Reportable (Crash)": string;
  "First Harmful Event Location": string;
  "Geocoding Method": string;
  "Hit and Run": string;
  Locality: string;
  "Most Harmful Event (All Vehicles)": string;
  "Road Contributing Circumstance": string;
  "School Bus Related": string;
  "Speed Limit": string;
  "Traffic Control Device Function": string;
  "Vehicle Sequence of Events (All Vehicles)": string;
  "Work Zone Related": string;
  "Vulnerable User Sequence of Events (All Persons)": string;
  "Vulnerable User Distracted By (All Persons)": string;
  "Vulnerable User Traffic Control Type (All persons)": string;
  "Vulnerable User Origin Destination (All Persons)": string;
  "Vulnerable User Contributing Circumstances (All Persons)": string;
  "Vulnerable User Alcohol Suspected Type (All Persons)": string;
  "Vulnerable User Drug Suspected Type (All Persons)": string;
  X: string;
  Y: string;
  Latitude: string;
  Longitude: string;
  "Street Number": string;
  "Near Intersection Roadway": string;
  "Distance and Direction From Intersection": string;
  "Vehicle Unit Number": string;
  "Driver Age": string;
  "Driver Distracted By": string;
  "Driver License State": string;
  "Total Occupants in Vehicle": string;
  "Vehicle Sequence of Events": string;
  "Vehicle Make": string;
  "Vehicle Model": string;
  "Driver Violation Code": string;
}

const parseDate = (dateString: string) => {
  const [month, day, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
};
const parseCommaSeparatedList = (list: string) =>
  list.split(",").map((item) => item.trim());

const parseSlashSeparatedList = (list: string) =>
  list.split("/").map((item) => item.trim());
const parseNumber = (numberString: string) => Number(numberString);
const parseAgeRange = (rangeString: string) => {
  const [min, max] = rangeString.split("-");
  return { min: Number(min), max: Number(max) };
};
const parseBoolean = (boolString: string) => boolString === "Yes";
const parseTime = (timeString: string) => {
  let [number, ampm] = timeString.split(" ");
  let [hour, minute] = number.split(":");
  let hourNum: number;
  if (ampm === "PM") {
    hourNum = Number(hour) + 12;
  } else {
    hourNum = Number(hour);
  }
  return hourNum * 60 + Number(minute);
};

export type DataRow = {
  rawData: RawCrashDataRow;
  crashNumber: number;
  cityTownName: string;
  crashDate: Date;
  driverDistractedBy: string[];
  vulnerableUserTypes: string[];
  vulnerableUserType: 'Bicyclist' | 'Pedestrian' | 'Skateboarder' | 'Wheelchair' | 'Scooter' | 'other' | 'multiple';
  crashSeverity: string;
  latitude: number;
  longitude: number;
  fatalities: number;
  nonFatalInjuries: number;
  weatherConditions: string;
  crashTime: number;
  cyclists: number;
  pedestrians: number;
  wheelchairs: number;
  scooters: number;
  otherVRU: number;
  crashMonth : number;
};

export const parseDataRow = (rawData: RawCrashDataRow): DataRow => {
  let dataRow = {
    rawData,
    crashNumber: parseNumber(rawData["Crash Number"]),
    cityTownName: rawData["City Town Name"],
    crashDate: parseDate(rawData["Crash Date"]),
    crashHour: parseNumber(rawData["Crash Hour"]),
    driverDistractedBy: parseCommaSeparatedList(
      rawData["Driver Distracted By"]
    ),
    vulnerableUserTypes: parseSlashSeparatedList(
      rawData["Vulnerable User Type (All Persons)"]
    ),
    vulnerableUserType: "other",
    crashSeverity: rawData["Crash Severity"],
    latitude: parseNumber(rawData["Latitude"]),
    longitude: parseNumber(rawData["Longitude"]),
    fatalities: parseNumber(rawData["Total Fatalities"]),
    nonFatalInjuries: parseNumber(rawData["Total Non-Fatal Injuries"]),
    weatherConditions: rawData["Weather Conditions"],
    crashTime: parseTime(rawData["Crash Time"]),
    cyclists: 0,
    pedestrians: 0,
    skateboarders: 0,
    wheelchairs: 0,
    scooters: 0,
    otherVRU: 0,
    crashMonth : parseDate(rawData["Crash Date"]).getMonth()+1
  };
  for (let i = 0; i < dataRow.vulnerableUserTypes.length; i++) {
    if (dataRow.vulnerableUserTypes[i].includes("Bicyclist")) {
      dataRow.cyclists++;
    } else if (dataRow.vulnerableUserTypes[i].includes("Pedestrian")) {
      dataRow.pedestrians++;
    } else if (dataRow.vulnerableUserTypes[i].includes("Skateboard")) {
      dataRow.skateboarders++;
    } else if (dataRow.vulnerableUserTypes[i].includes("heelchair")) {
      dataRow.wheelchairs++;
    } else if (dataRow.vulnerableUserTypes[i].includes("cooter")) {
      dataRow.scooters++;
    } else {
      console.log(
        "Did not recognize vulnerable user type",
        dataRow.vulnerableUserTypes[i]
      );
      dataRow.otherVRU++;
    }
  }
  if (dataRow.cyclists > 0) {
    dataRow.vulnerableUserType = "cyclists";
  } else if (dataRow.pedestrians > 0) {
    dataRow.vulnerableUserType = "pedestrians";
  } else if (dataRow.skateboarders > 0) {
    dataRow.vulnerableUserType = "skateboarders";
  } else if (dataRow.wheelchairs > 0) {
    dataRow.vulnerableUserType = "wheelchairs";
  } else if (dataRow.scooters > 0) {
    dataRow.vulnerableUserType = "scooters";
  } else {
    dataRow.vulnerableUserType = "other";
  }
  if (
    Math.max(
      dataRow.cyclists,
      dataRow.pedestrians,
      dataRow.skateboarders,
      dataRow.wheelchairs,
      dataRow.scooters,
      dataRow.otherVRU
    ) <
    dataRow.cyclists +
      dataRow.pedestrians +
      dataRow.skateboarders +
      dataRow.wheelchairs +
      dataRow.scooters +
      dataRow.otherVRU
  ) {
    dataRow.vulnerableUserType = "multiple";
  }
  return dataRow;
};
