import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import LoginIcon from "@mui/icons-material/Login";
import { Grid } from "@mui/material";
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
        Sign In <LoginIcon></LoginIcon>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Add your credentials to sign into the application
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
            />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Sign In</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
