import { atom } from "recoil";
import { Challenge, Community } from "../types/types";

export const emailAtom = atom({
  key: "emailAtom",
  default: "",
});

export const passwordAtom = atom({
  key: "passwordAtom",
  default: "",
});

export const loginModalState = atom({
  key: "loginModalState",
  default: false,
});

export const passwordTestPassed = atom({
  key: "passwordTestPassed",
  default: false,
});

export const passwordStrengthTestPassed = atom({
  key: "passwordStrengthTestPassed",
  default: false,
});

export const showCreateCommunityAtom = atom({
  key: "showCreateCommunityAtom",
  default: false,
});

export const showDeleteCommunityAtom = atom({
  key: "showDeleteCommunityAtom",
  default: false,
});

export const showDeleteConfirmationAtom = atom({
  key: "showDeleteConfirmationAtom",
  default: false,
});

export const showCreateChallengeAtom = atom({
  key: "showCreateChallengeAtom",
  default: false,
});

export const deleteCommunityAtom = atom<Community | null>({
  key: "deleteCommunityAtom",
  default: null,
});

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

export const firebaseTokenAtom = atom({
  key: "firebaseTokenAtom",
  default: "",
});

export const stravaLoggedinAtom = atom({
  key: "stravaLoggedinAtom",
  default: false,
});

export const challengesAtom = atom({
  key: "challengesAtom",
  default: [] as Challenge[],
});

export const updateChallengeListAtom = atom({
  key: "updateChallengeListAtom",
  default: false,
});

export const updateCommunityListAtom = atom({
  key: "updateCommunityListAtom",
  default: false,
});

export const communitiesAtom = atom({
  key: "communitiesAtom",
  default: [] as Community[],
});

export const authTokenAtom = atom({
  key: "authTokenAtom",
  default: "",
});
