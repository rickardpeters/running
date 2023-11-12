import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { onScreenAlertAtom } from "../../recoil/atoms";

const OnScreenAlert = () => {
  const [snack, setSnack] = useRecoilState(onScreenAlertAtom);

  return (
    <div className="absolute top-[5vh]">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.showSnack}
        autoHideDuration={3000}
        onClose={() =>
          setSnack({
            ...snack,
            showSnack: false,
          })
        }>
        <Alert severity={snack.snackColor}>{snack.snackMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default OnScreenAlert;
