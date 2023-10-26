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
import { showDeleteCommunityAtom } from "../../recoil/atoms";
import DeleteCommunityModal from "./DeleteCommunityModal";
import DeleteCommunityConfirmation from "./DeleteCommunityConfirmation";
interface CommunityCardProps {
  community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const [deleteCommunity, setDeleteCommunity] = useState<Community | null>(
    null
  );
  const [showDeleteCommunity, setShowDeleteCommunity] = useRecoilState(
    showDeleteCommunityAtom
  );
  const handleDeleteClick = (community: Community) => {
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
      <DeleteCommunityModal community={deleteCommunity} />
      <DeleteCommunityConfirmation />
    </Container>
  );
};

export default CommunityCard;
