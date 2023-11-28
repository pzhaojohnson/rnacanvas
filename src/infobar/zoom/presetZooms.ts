const presetZooms = [
  0.01,
  0.02,
  0.05,
  0.1,
  0.25,
  0.35,
  0.5,
  0.6,
  0.75,
  0.9,
  1,
  1.1,
  1.25,
  1.5,
  2,
  2.5,
  3,
  4,
  5,
  6,
  7.5,
  10,
  20,
  50,
  100,
  200,
  500,
];

// returns undefined when there is no lower preset zoom
export function nextLowestPresetZoom(z: number): number | undefined {
  let lower = presetZooms.filter(pz => pz < z);
  if (lower.length > 0) {
    return Math.max(...lower);
  } else {
    return undefined;
  }
}

// returns undefined when there is no higher preset zoom
export function nextHighestPresetZoom(z: number): number | undefined {
  let higher = presetZooms.filter(pz => pz > z);
  if (higher.length > 0) {
    return Math.min(...higher);
  } else {
    return undefined;
  }
}
