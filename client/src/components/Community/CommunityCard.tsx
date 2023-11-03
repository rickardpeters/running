import { Typography, Card, CardContent, CardActions, Button, Container } from "@mui/material";
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
  const [showDeleteCommunity, setShowDeleteCommunity] = useRecoilState(showDeleteCommunityAtom);

  const [activeCommunity, setActiveCommunity] = useRecoilState(activeCommunityAtom);

  const [showUpdateCommunity, setShowUpdateCommunity] = useRecoilState(showUpdateCommunityAtom);
  const handleDeleteClick = (community: Community) => {
    setActiveCommunity(community);
    setShowDeleteCommunity(true);
  };
  const [updateCommunityList, setUpdateCommunityList] = useRecoilState(updateCommunityListAtom);

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
    const token = user.user.accessToken;

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
    <div className="m-2">
      <div className="card w-96 bg-white shadow-md text-primary-content rounded-md hover:scale-[102%] transition ease-in-out max-w-[350px] h-[250px]">
        <div className="card-body">
          <h2 className="card-title text-2xl">{community.community_name}</h2>
          <br />
          <p>{community.description === "" ? <i>No description</i> : community.description}</p>
        </div>
        <div className="card-actions justify-center p-3">
          {joined() ? (
            <>
              <button className="btn btn-sm bg-info rounded-md" onClick={() => handleUpdateClick(community)}>
                Edit
              </button>
              <button className="btn btn-sm bg-error rounded-md" onClick={() => handleDeleteClick(community)}>
                Delete
              </button>
              <button className="btn btn-sm bg-success rounded-md" onClick={() => handleLeaveClick(community)}>
                Leave
              </button>
            </>
          ) : (
            <button className="btn bg-success rounded-md" onClick={() => handleJoinClick(community)}>
              Join
            </button>
          )}
        </div>
      </div>

      <DeleteCommunityModal community={activeCommunity} />

      <UpdateCommunityForm community={activeCommunity} />
    </div>
  );
};

export default CommunityCard;
