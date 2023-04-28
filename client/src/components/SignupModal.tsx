import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import LoginIcon from "@mui/icons-material/Login";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Grid } from "@mui/material";
import CountrySelect from "./CountrySelect";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" sx={{ m: 2 }} onClick={handleClickOpen}>
        Join Now <RocketLaunchIcon></RocketLaunchIcon>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join The Club!</DialogTitle>
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
              />
            </Grid>
            <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              id="Password"
              label="Last Name"
              type="name"
              fullWidth
              variant="outlined"
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
              />
            </Grid>
            <Grid item xs={6}>
            <CountrySelect/>
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
            />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
