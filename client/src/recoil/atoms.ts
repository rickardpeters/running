import { atom } from "recoil";

export const loginModalState = atom ({
    key: 'loginModalState',
    default: false
})

export const passwordTestPassed = atom ({
    key:'passwordTestPassed',
    default:false
})

export const passwordStrengthTestPassed = atom ({
    key:'passwordStrengthTestPassed',
    default:false
})

export const showCreateCommunityAtom = atom ({
    key:'showCreateCommunityAtom',
    default:false
})

export const showCreateChallengeAtom = atom ({
    key:'showCreateChallengeAtom',
    default:false
})

export const runTotalsAtom = atom({
    key:'runTotalsAtom',
    default: {
        count: 0,
        distance: 0,
        moving_time: 0,
        elapsed_time: 0,
        elevation_gain: 0,
      }
})

export const athleteAtom = atom({
    key:'athleteAtom',
    default: {
        firstname: "",
        lastname: "",
        id: "",
      }
})

export const firebaseTokenAtom = atom({
    key:'firebaseTokenAtom',
    default: null
})

export const stravaLoggedinAtom = atom({
    key:'stravaLoggedinAtom',
    default: false
})

export interface Challenge {
    name: string;
    start_date: string;
    end_date: string;
    goal: number;
    community_id: number;
  }

export const challengesAtom = atom({
    key:'challengesAtom',
    default: [] as Challenge [],
        
    })

    