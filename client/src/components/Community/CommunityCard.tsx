import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
} from "@mui/material";
import { Community } from "../../types/types";
import { useContext } from "react";
import { useRecoilState } from "recoil";
import {
  activeCommunityAtom,
  onScreenAlertAtom,
  showDeleteCommunityAtom,
  showUpdateCommunityAtom,
  updateCommunityListAtom,
} from "../../recoil/atoms";
import "./communityStyle.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../auth/AuthContextProvider";
import DeleteCommunityModal from "./DeleteCommunityModal";
import DeleteCommunityConfirmation from "./DeleteCommunityConfirmation";
import UpdateCommunityForm from "./UpdateCommunityForm";
interface CommunityCardProps {
  community: Community;
  profileList: boolean;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const user = useContext(Context);
  const uid = user.user.uid;
  const token = user.user.accessToken;
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const [showDeleteCommunity, setShowDeleteCommunity] = useRecoilState(
    showDeleteCommunityAtom
  );

  const [activeCommunity, setActiveCommunity] =
    useRecoilState(activeCommunityAtom);

  const [showUpdateCommunity, setShowUpdateCommunity] = useRecoilState(
    showUpdateCommunityAtom
  );
  const handleDeleteClick = (community: Community) => {
    console.log(activeCommunity);
    setActiveCommunity(community);
    setShowDeleteCommunity(true);
  };
  const [updateCommunityList, setUpdateCommunityList] = useRecoilState(
    updateCommunityListAtom
  );

  const joined = () => {
    var joined = false;
    const members = getCommunityMembers();
    if (members.includes(uid)) {
      joined = true;
    }

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
    await axios
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
          setUpdateCommunityList(!updateCommunityList);
          setAlert({
            showSnack: true,
            snackColor: "success",
            snackMessage: "You have joined the community!",
          });

          //Navigate to the community page to give the list a cance to update
        },
        (error) => {
          console.log(error);
          setAlert({
            showSnack: true,
            snackColor: "error",
            snackMessage: "Unable to join community.",
          });
        }
      );
  };

  const handleLeaveClick = async (community: Community) => {
    axios
      .post(
        "http://127.0.0.1:8000/communities/leave/",
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
          console.log("left: ", response);
          setUpdateCommunityList(!updateCommunityList);
          setAlert({
            showSnack: true,
            snackColor: "info",
            snackMessage: "You have left the community",
          });
          //Navigate to the community page to give the list a cance to update
        },
        (error) => {
          console.log(error);
          setAlert({
            showSnack: true,
            snackColor: "error",
            snackMessage: "Unable to leave community",
          });
        }
      );
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
            {joined() ? (
              <>
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
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleLeaveClick(community)}
                >
                  Leave
                </Button>
              </>
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
      <DeleteCommunityModal community={activeCommunity} />

      <UpdateCommunityForm community={activeCommunity} />
    </Container>
  );
};

export default CommunityCard;
