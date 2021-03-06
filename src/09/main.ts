import { depthMap } from "./input";
import {
  calculateBasinValue,
  calculateRiskLevel,
  detectLowPoints,
  locateBasins,
} from "./lib";

const lowPoints = detectLowPoints(depthMap);
const riskLevel = calculateRiskLevel(lowPoints);
console.log(`Risk level is ${riskLevel}`);

const basins = locateBasins(depthMap, lowPoints);
const basinValue = calculateBasinValue(basins);
console.log(`Basin value is ${basinValue}`);
