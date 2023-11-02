import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { onScreenAlertAtom } from "../../recoil/atoms";
import { OnScreenAlertProps } from "../../types/types";

const OnScreenAlert = () => {
  const [snack, setSnack] = useRecoilState(onScreenAlertAtom);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.showSnack}
        autoHideDuration={6000}
        onClose={() => setSnack({ showSnack: false, snackColor: "info", snackMessage: "" })}>
        <Alert severity={snack.snackColor}>{snack.snackMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default OnScreenAlert;
