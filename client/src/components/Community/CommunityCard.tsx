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
  deleteCommunityAtom,
  showDeleteCommunityAtom,
} from "../../recoil/atoms";
import "./comunityStyle.css";
import { Link } from "react-router-dom";
import DeleteCommunityModal from "./DeleteCommunityModal";
import DeleteCommunityConfirmation from "./DeleteCommunityConfirmation";
interface CommunityCardProps {
  community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const [deleteCommunity, setDeleteCommunity] =
    useRecoilState(deleteCommunityAtom);
  const [showDeleteCommunity, setShowDeleteCommunity] = useRecoilState(
    showDeleteCommunityAtom
  );
  const handleDeleteClick = (community: Community) => {
    console.log(community);
    setDeleteCommunity(community);
    setShowDeleteCommunity(true);
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
          </CardActions>
        </Card>
      </Link>
      <DeleteCommunityModal community={deleteCommunity} />
      <DeleteCommunityConfirmation />
    </Container>
  );
};

export default CommunityCard;
