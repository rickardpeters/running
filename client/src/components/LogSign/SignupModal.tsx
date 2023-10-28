import * as React from "react";
import { useState, useContext, SetStateAction, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, LinearProgress, TextField } from "@mui/material";
import LoginModal from "./LoginModal";
import { passwordStrength, FirstOption, Option } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import PasswordField from "./PasswordField";
import { useRecoilValue } from "recoil";
import {
  passwordStrengthTestPassed,
  passwordTestPassed,
} from "../../recoil/atoms";
import axios from "axios";

import { Auth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { getUserToken } from "../../utils";

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
  const [passStrength, setStrength] = useState<number | null>(null);

  const testPassed = useRecoilValue(passwordTestPassed);
  const strengthTestPassed = useRecoilValue(passwordStrengthTestPassed);

  const navigate = useNavigate;

  const signUp = async () => {
    const newUser = {
      email: email,
      first_name: firstName,
      last_name: lastName,
    };
  };

  const handleClose = () => {
    props.setShow(false);
  };

  const customOptions: [FirstOption<string>, ...Option<string>[]] = [
    {
      id: 0,
      value: "Too weak",
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: "Weak",
      minDiversity: 2,
      minLength: 8,
    },
    {
      id: 2,
      value: "Medium",
      minDiversity: 4,
      minLength: 8,
    },
    {
      id: 3,
      value: "Strong",
      minDiversity: 4,
      minLength: 10,
    },
  ];

  return (
    <>
      {props.signedUp ? (
        <LoginModal
          show={props.signedUp}
          setShow={props.setSignedUp}
        ></LoginModal>
      ) : (
        <>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Please enter your information below to Join the club!
            </DialogContentText>
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <PasswordField
                password={password}
                setPassword={setPassword}
              ></PasswordField>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {strengthTestPassed && testPassed ? (
              <Button type="button" variant="contained" onClick={signUp}>
                Sign Up
              </Button>
            ) : (
              <Button type="button" variant="contained" disabled>
                Sign Up
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </>
  );
};

export default SignUpModal;
