import { Button, Grid, Paper } from '@mui/material';
import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import ClearIcon from '@mui/icons-material/Clear';

const CommunityListComponent = () => {
  return (
    <div>
      <Paper elevation={2} style={{ margin: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
           
              <h3 style={{ margin: '5px' }}>Community Name</h3>
              <div style={{ margin: '5px' }}>Short description</div>
            
          </Grid>
          <Grid item xs={12} md={4}>
          <GroupIcon></GroupIcon>
            <div>
                Amount of members in community from database
            </div>
          </Grid>
          <Grid item xs={12} md={4} container justifyContent="center" alignItems="center">

            <Button title="Leave Community"color='warning'><ClearIcon></ClearIcon></Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CommunityListComponent;