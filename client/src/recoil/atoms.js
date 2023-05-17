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
