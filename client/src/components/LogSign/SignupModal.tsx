import * as React from "react";
import { useState, SetStateAction, Dispatch } from "react";

import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import LoginModal from "./LoginModal";
import PasswordField from "./PasswordField";
import { useRecoilState, useRecoilValue } from "recoil";
import { authTokenAtom, passwordStrengthTestPassed, passwordTestPassed } from "../../recoil/atoms";

import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "firebase/auth";

interface SignUpModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;

  signedUp: boolean;
  setSignedUp: Dispatch<SetStateAction<boolean>>;
}

const SignUpModal = (props: SignUpModalProps) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);
  const testPassed = useRecoilValue(passwordTestPassed);
  const strengthTestPassed = useRecoilValue(passwordStrengthTestPassed);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(email);
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(password);
    setPassword(e.target.value);
  };

  const signUp = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        signInToDjango(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInToDjango = async (user: any) => {
    const token = user.user.accessToken;
    setAuthToken(token);

    await fetch("http://127.0.0.1:8000/users/login/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
      //If the django auth fails, the user has to be logged out from firebase
      // The order has to be firebase ->django since we need the auth token
      console.log(e);
      signOut(auth);
    });
  };

  const handleClose = () => {
    props.setShow(false);
  };

  return (
    <>
      {props.signedUp ? (
        <LoginModal show={props.signedUp} setShow={props.setSignedUp}></LoginModal>
      ) : (
        <>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>Please enter your information below to Join the club!</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="first name"
                  label="First Name"
                  type="name"
                  fullWidth
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFirstName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="last name"
                  label="Last Name"
                  type="name"
                  fullWidth
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setLastName(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Adress"
                  type="email"
                  fullWidth
                  variant="outlined"
                  onChange={() => handleEmail}
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
        </>
      )}
    </>
  );
};

export default SignUpModal;
