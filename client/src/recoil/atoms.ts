import { atom } from "recoil";
import { OnScreenAlertProps } from "../types/types";

export const onScreenAlertAtom = atom<OnScreenAlertProps>({
  key: "onScreenAlertAtom",
  default: { showSnack: false, snackColor: "success", snackMessage: "" },
});