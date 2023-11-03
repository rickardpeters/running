import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import {
  emailAtom,
  authTokenAtom,
  onScreenAlertAtom,
} from "../../recoil/atoms";
import { auth } from "../../firebase";

interface LoginModalProps {
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginModal = (props: LoginModalProps) => {
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  const navigate = useNavigate();

  const logIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/UserPage");
    } catch (error) {
      console.log(error);
      setAlert({
        showSnack: true,
        snackColor: "error",
        snackMessage: "Wrong Email or password",
      });

      // If there's an error during Django sign-in, you can choose to show an error message or take other actions
    }
  };

  const handleClose = () => {
    props.setShow(false);
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>Add your credentials to sign in to the application.</DialogContentText>
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
        <button className="btn rounded-md" onClick={handleClose}>
          Cancel
        </button>
        <button className="btn btn-info rounded-md" onClick={logIn}>
          Log In
        </button>
      </DialogActions>
    </>
  );
};

export default LoginModal;
