import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from 'firebase/auth'
import LoginIcon from "@mui/icons-material/Login";
import { auth } from "../firebase"



const LoginModal = () => {

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn = () => {
    var err = false
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      console.log(userCredentials)
    }).catch((error) => {
      console.log(error);
      err = true;
    }).then(() => {
      if (!err) {
        handleClose()
      }
    })
          
      
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" sx={{ m: 2 }} onClick={handleClickOpen}>
        Sign In <LoginIcon></LoginIcon>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
          Add your credentials to sign in to the application
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
          <Button onClick={signIn}>Log In</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginModal