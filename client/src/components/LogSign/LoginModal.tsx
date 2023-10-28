import * as React from "react";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  firebaseTokenAtom,
  emailAtom,
  authTokenAtom,
} from "../../recoil/atoms";
import { auth } from "../../firebase";
import { getUserToken } from "../../utils";

interface LoginModalProps {
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginModal = (props: LoginModalProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  const navigate = useNavigate();

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

  const logIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        signInToDjango(user);
        console.log(user);
        navigate("/homePage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    props.setShow(false);
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Add your credentials to sign in to the application.
        </DialogContentText>
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
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              id="Password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={logIn}>
          Log In
        </Button>
      </DialogActions>
    </>
  );
};

export default LoginModal;
