import * as React from "react";
import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRecoilState } from "recoil";
import { auth } from "../../firebase";
import { onScreenAlertAtom } from "../../recoil/atoms";
import { emailAtom } from "../../recoil/authAtoms";

interface LoginModalProps {
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginModal = (props: LoginModalProps) => {
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useState("");

  const logIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((error) => {
        console.error(error.code);
        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: error.code,
        });
      });

    // If there's an error during Django sign-in, you can choose to show an error message or take other actions
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
