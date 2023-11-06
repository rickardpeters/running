import { atom } from "recoil";
import { Challenge, Community, OnScreenAlertProps } from "../types/types";

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

export const showUpdateCommunityAtom = atom({
  key: "showUpdateCommunityAtom",
  default: false,
});

export const showUpdateConfirmationAtom = atom({
  key: "showUpdateConfirmationAtom",
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

export const activeCommunityAtom = atom<Community | null>({
  key: "activeCommunityAtom",
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

export const stravaTokenAtom = atom({
  key: "stravaTokenAtom",
  default: "",
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

export const onScreenAlertAtom = atom<OnScreenAlertProps>({
  key: "onScreenAlertAtom",
  default: { showSnack: false, snackColor: "success", snackMessage: "" },
});

export const joinedCommunitiesAtom = atom({
  key: "joinedCommunitiesAtom",
  default: [] as Community[],
});
