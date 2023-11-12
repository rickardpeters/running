import { atom } from "recoil";

export const emailAtom = atom({
    key: "emailAtom",
    default: "",
  });
  export const passwordTestPassed = atom({
    key: "passwordTestPassed",
    default: false,
  });
  
  export const passwordStrengthTestPassed = atom({
    key: "passwordStrengthTestPassed",
    default: false,
  });
  export const firebaseTokenAtom = atom({
    key: "firebaseTokenAtom",
    default: "",
  });

  export const openSignUpAtom = atom ({
    key:"openSignUpAtom",
    default: false
  })

  export const authTokenAtom = atom({
    key: "authTokenAtom",
    default: "",
  });