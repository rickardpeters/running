import { atom } from "recoil";

export const runTotalsAtom = atom({
    key: "runTotalsAtom",
    default: {
      count: 0,
      distance: 0,
      moving_time: 0,
      elapsed_time: 0,
      elevation_gain: 0,
    },
  });
  
  export const athleteAtom = atom({
    key: "athleteAtom",
    default: {
      firstname: "",
      lastname: "",
      id: "",
    },
  });

  export const stravaLoggedinAtom = atom({
    key: "stravaLoggedinAtom",
    default: false,
  });
  
  export const stravaTokenAtom = atom({
    key: "stravaTokenAtom",
    default: "",
  });