import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";
import { useRecoilState } from "recoil";
import { communitiesAtom, emailAtom } from "../recoil/atoms";
import { useEffect } from "react";
import { auth } from "../firebase";
import { getUserToken } from "../utils";

const Communities = () => {
  const [communities, setCommunities] = useRecoilState(communitiesAtom);
  const [email, setEmail] = useRecoilState(emailAtom);

  async function fetchCommunities() {
    try {
      const response = await axios.get("http://127.0.0.1:8500/communities/", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
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
              <PeopleIcon />
              {community.members.length}
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
              <b>Created: </b>
              {community.created_at.split("T")[0]}
            </Typography>
          </CardContent>
          <CardActions>
            {community.members.some((member) => member.email === email) ? (
              <Button>Leave Community</Button>
            ) : (
              <Button
                style={{ display: "flex", flexDirection: "column" }}
                onClick={handleJoinCommunity}
              >
                Join community
              </Button>
            )}
          </CardActions>
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
