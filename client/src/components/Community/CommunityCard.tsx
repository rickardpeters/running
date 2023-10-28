import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
} from "@mui/material";
import { Community } from "../../types/types";
import { useContext, useState } from "react";
import { useRecoilState } from "recoil";
import { showDeleteCommunityAtom } from "../../recoil/atoms";
import DeleteCommunityModal from "./DeleteCommunityModal";
import DeleteCommunityConfirmation from "./DeleteCommunityConfirmation";
import "./comunityStyle.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../auth/AuthContextProvider";
interface CommunityCardProps {
  community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const user = useContext(Context);
  const [deleteCommunity, setDeleteCommunity] = useState<Community | null>(
    null
  );
  const [showDeleteCommunity, setShowDeleteCommunity] = useRecoilState(
    showDeleteCommunityAtom
  );
  const uid = user.user.uid;
  const handleDeleteClick = (community: Community) => {
    setDeleteCommunity(community);
    setShowDeleteCommunity(true);
  };

  const joined = () => {
    var joined = false;
    const members = getCommunityMembers();
    if (members.includes(uid)) {
      joined = true;
    }
    console.log(members, uid);
    console.log(joined);
    return joined;
  };

  const getCommunityMembers = () => {
    const memberIdentifiers: string[] = [];
    for (const member of community.members) {
      memberIdentifiers.push(member.identifier);
    }
    return memberIdentifiers;
  };
  const handleJoinClick = async (community: Community) => {
    const token = user.user.accessToken;
    console.log();

    axios
      .post(
        "http://127.0.0.1:8000/communities/join/",
        {
          user: `${uid}`,
          community_id: community.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(
        (response) => {
          console.log("joined: ", response);
          //Navigate to the community page to give the list a cance to update
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <Container
      style={{
        maxWidth: "300px",
        minWidth: "300px",
      }}
    >
      <Link to={""}>
        <Card
          sx={{ minWidth: 200, margin: "10px" }}
          className="community-card"
          onClick={() => console.log(community)}
        >
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
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDeleteClick(community)}
            >
              Delete
            </Button>
            {joined() ? (
              <></>
            ) : (
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleJoinClick(community)}
              >
                Join
              </Button>
            )}
          </CardActions>
        </Card>
      </Link>
      <DeleteCommunityModal community={deleteCommunity} />
      <DeleteCommunityConfirmation />
    </Container>
  );
};

export default CommunityCard;
