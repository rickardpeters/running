import {
  Box,
  Button,
  Grid,
  Paper,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import ClearIcon from "@mui/icons-material/Clear";
import { SvgIconComponent } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface CommunityListProps {
  CommunityName: String;
  ShortDescription: String;
  members: number;
  ButtonFunc: () => void;
  icon: any;
}

const CommunityListComponent = (props: CommunityListProps) => {
  const matches = useMediaQuery("(max-width:960px)"); // Change the breakpoint as per your requirement
  const typographyVariant = matches ? "body1" : "h6"; // change the typography variant as per your requirement

  return (
    <Link to={"/UserPage"} style={{ textDecoration: "none" }}>
      <Box style={{ margin: "10px" }}>
        <Paper elevation={2} style={{ margin: "25px" }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item container justifyContent="center" alignItems="center">
              <Typography variant={"h6"} style={{ margin: "5px" }}>
                {props.CommunityName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                minWidth: "150px",
                flexDirection: { md: "column" },
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              <Typography variant={"body2"} style={{ margin: "10px" }}>
                {props.ShortDescription}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                minWidth: "150px",
                flexDirection: { md: "column" },
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              <GroupIcon></GroupIcon>
              <Box>{props.members}</Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                minWidth: "150px",
                flexDirection: { md: "column" },
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              <Button
                title="Leave Community"
                color="warning"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  props.ButtonFunc();
                }}
              >
                {props.icon}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Link>
  );
};

export default CommunityListComponent;
