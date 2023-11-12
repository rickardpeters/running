import { atom } from "recoil";
import { Challenge } from "../types/types";

export const showCreateChallengeAtom = atom({
    key: "showCreateChallengeAtom",
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
  
  export const createChallenge = atom<Challenge>({
    key: "createChallenge",
    
    default: {name:"", goal:0, community_id:null},
  });