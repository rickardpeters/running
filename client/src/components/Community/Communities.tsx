import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  authTokenAtom,
  communitiesAtom,
  emailAtom,
  showCreateCommunityAtom,
  updateCommunityListAtom,
} from "../../recoil/atoms";
import { useEffect } from "react";
import CreateCommunityModal from "./CreateCommunityModal";

const Communities = () => {
  const [communities, setCommunities] = useRecoilState(communitiesAtom);
  const [showCreateCommunity, setShowCreateCommunity] = useRecoilState(
    showCreateCommunityAtom
  );
  const updateCommunityList = useRecoilValue(updateCommunityListAtom);
  const authToken = useRecoilValue(authTokenAtom);

  async function fetchCommunities() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/communities", {
        headers: {
          // Authorization: `Token ${authToken}`,
        },
      });
      console.warn(response.data);
      setCommunities(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleJoinCommunity = async () => {};

  //Checks if updateCommunityList state changes, triggering the useEffect.
  useEffect(() => {
    fetchCommunities();
  }, [updateCommunityList]);

  return (
    <Container style={{ marginTop: "25px" }}>
      <Grid container spacing={1}>
        {communities.map((community) => (
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <Card sx={{ minWidth: 200, margin: "10px" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                ></Typography>
                <Typography variant="h5" component="div">
                  {community.community_name}
                  {"      "}
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                ></Typography>
                <Typography variant="body2">
                  {community.description === "" ? (
                    <i>No description</i>
                  ) : (
                    community.description
                  )}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" size="small">
                  Edit
                </Button>
                <Button variant="contained" color="error" size="small">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ mb: 1.5 }}
          variant="contained"
          onClick={() => setShowCreateCommunity(true)}
        >
          Create new community
        </Button>
      </Container>
      {/* <CreateCommunityModal /> */}
    </Container>
  );
};

export default Communities;
