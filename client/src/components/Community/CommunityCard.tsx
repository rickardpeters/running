import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
} from "@mui/material";
import { Community } from "../../types/types";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  activeCommunityAtom,
  showDeleteCommunityAtom,
  showUpdateCommunityAtom,
} from "../../recoil/atoms";
import "./comunityStyle.css";
import { Link } from "react-router-dom";
import DeleteCommunityModal from "./DeleteCommunityModal";
import DeleteCommunityConfirmation from "./DeleteCommunityConfirmation";
import UpdateCommunityModal from "./UpdateCommunityForm";
import UpdateCommunityForm from "./UpdateCommunityForm";
interface CommunityCardProps {
  community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const [activeCommunity, setActiveCommunity] =
    useRecoilState(activeCommunityAtom);
  const [showDeleteCommunity, setShowDeleteCommunity] = useRecoilState(
    showDeleteCommunityAtom
  );
  const [showUpdateCommunity, setShowUpdateCommunity] = useRecoilState(
    showUpdateCommunityAtom
  );
  const handleDeleteClick = (community: Community) => {
    console.log(activeCommunity);
    setActiveCommunity(community);
    setShowDeleteCommunity(true);
  };

  const handleUpdateClick = (community: Community) => {
    console.log(activeCommunity);
    setActiveCommunity(community);
    setShowUpdateCommunity(true);
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
            <Button
              variant="contained"
              size="small"
              onClick={() => handleUpdateClick(community)}
            >
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
          </CardActions>
        </Card>
      </Link>
      <DeleteCommunityModal community={activeCommunity} />
      <DeleteCommunityConfirmation />
      <UpdateCommunityForm community={activeCommunity} />
    </Container>
  );
};

export default CommunityCard;
