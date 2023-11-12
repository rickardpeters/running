import * as React from "react";
import { useState, SetStateAction, Dispatch } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog, Grid, TextField } from "@mui/material";
import PasswordField from "./PasswordField";
import { useRecoilState, useRecoilValue } from "recoil";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "firebase/auth";
import { onScreenAlertAtom } from "../../recoil/atoms";
import { passwordTestPassed, passwordStrengthTestPassed, openSignUpAtom } from "../../recoil/authAtoms";

interface SignUpModalProps {
  signedUp: boolean;
  setSignedUp: Dispatch<SetStateAction<boolean>>;
}

const SignUpModal = (props: SignUpModalProps) => {
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const testPassed = useRecoilValue(passwordTestPassed);
  const strengthTestPassed = useRecoilValue(passwordStrengthTestPassed);

  const [show, setShow] = useRecoilState(openSignUpAtom);

  const signUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {})
      .catch((error) => {
        console.error(error.code);

        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: error.code,
        });
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Dialog open={show}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>Please enter your information below to Join the club!</DialogContentText>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <PasswordField password={password} setPassword={setPassword}></PasswordField>
          </Grid>
        </DialogContent>
        <DialogActions>
          <button className="btn rounded-md" onClick={handleClose}>
            Cancel
          </button>
          {strengthTestPassed && testPassed ? (
            <button className="btn btn-info rounded-md" onClick={signUp}>
              Sign Up
            </button>
          ) : (
            <button className="btn btn-disabled rounded-md">Sign Up</button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUpModal;
