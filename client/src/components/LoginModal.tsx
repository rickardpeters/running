import * as React from "react";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { UserContext } from "./auth/AuthContextProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { firebaseTokenAtom } from "../recoil/atoms";

interface LoginModalProps {
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginModal = (props: LoginModalProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logInUser } = useContext(UserContext);
  const [token, setToken] = useRecoilState(firebaseTokenAtom);

  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await logInUser(email, password);
      props.setShow(false);
      getfireBaseToken();
      navigate("/homePage");
    } catch (error) {
      console.log(error);
    }
  };

  //Fetches token from firebase and stores to tokenAtom for querys.

  async function getfireBaseToken() {
    const tokenUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqoeW4zK9f5YNgAKAsMg36CRwqxbh4-Ao";

    const requestData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(tokenUrl, requestData)
      .then((response) => {
        const idToken = response.data.idToken;
        setToken(idToken);
      })
      .catch((error) => {
        console.error("Error fetching token:", error);
      });
  }

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
        <Button variant="contained" onClick={signIn}>
          Log In
        </Button>
      </DialogActions>
    </>
  );
};

export default LoginModal;
