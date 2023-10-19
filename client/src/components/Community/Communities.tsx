import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { authTokenAtom, communitiesAtom, emailAtom } from "../../recoil/atoms";
import { useEffect } from "react";

const Communities = () => {
  const [communities, setCommunities] = useRecoilState(communitiesAtom);
  const authToken = useRecoilValue(authTokenAtom);

  async function fetchCommunities() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/communities", {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      console.warn(response.data);
      setCommunities(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleJoinCommunity = async () => {};

  useEffect(() => {
    sessionStorage.getItem("token")
      ? fetchCommunities()
      : console.log(
          "No token, cannot fetch communities." +
            sessionStorage.getItem("token")
        );
  }, []);

  return (
    <Container style={{ marginTop: "25px" }}>
      {communities.map((community) => (
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
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
            <Typography variant="body2">
              {community.description === "" ? (
                <i>No description</i>
              ) : (
                community.description
              )}

              <br />
              <br />
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      ))}
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button variant="contained">Create new communtiy</Button>
      </Container>
    </Container>
  );
};

export default Communities;
