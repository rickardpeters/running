import * as React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import CountrySelect from "./CountrySelect";
import { UserAuth, UserContext } from './auth/AuthContextProvider'
import LoginModal from "./LoginModal";







interface SignUpModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const SignUpModal = (props: SignUpModalProps) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const navigate = useNavigate;

  const { createUser } = useContext(UserContext)
  const { logOut } = UserAuth()

  const signUp = async () => {
    

    try{
      await createUser(email, password);
      props.setShow(false)
      setSignedUp(true)
      logOut()
      
      
    }
    catch (error) {
      console.log(error)
    }
          
      
  };

  const handleClose = () => {
    props.setShow(false)
  };

  return (
    <div>
      {!signedUp ? 
      <Dialog open={props.show} onClose={handleClose}>
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
            <Grid item xs={6}>
              <CountrySelect />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
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
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="Re type Password"
                label="Enter Password Again"
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
          <Button variant="contained" onClick={signUp}>Sign Up</Button>
        </DialogActions>
      </Dialog>
      :
      <LoginModal show={signedUp} setShow={setSignedUp}></LoginModal>
}
      
    </div>
  );
};

export default SignUpModal;
