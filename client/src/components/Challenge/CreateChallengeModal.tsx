import React, { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { onScreenAlertAtom, showCreateChallengeAtom, updateChallengeListAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import CreateChallengeForm from "./CreateChallengeForm";
import axios from "axios";
import { Context } from "../auth/AuthContextProvider";

const CreateChallengeModal = () => {
  const user = useContext(Context);
  const uid = user.user.uid;
  const token = user.user.token;
  const [showCreateChallenge, setShowCreateChallenge] = useRecoilState(showCreateChallengeAtom);
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const [challengeName, setChallengeName] = useState("");
  const [goal, setGoal] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [updateChallengeList, setUpdateChallengeList] = useRecoilState(updateChallengeListAtom);

  const handleCloseModal = () => {
    setShowCreateChallenge(false);
  };

  const handleSubmit = async () => {
    const newChallenge = {
      name: challengeName,
      goal: goal,
      community_id: communityId,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(`http://127.0.0.1:8000/challenges/${uid}/`, newChallenge, config);
      console.log("challenge created:", response);
      setAlert({
        showSnack: true,
        snackColor: "success",
        snackMessage: "Challenge created!",
      });
      handleCloseModal();
      setUpdateChallengeList(!updateChallengeList);
    } catch (error) {
      console.log(error);
      setAlert({
        showSnack: true,
        snackColor: "error",
        snackMessage: "Unable to create Challenge",
      });
    }
  };

  return (
    <Dialog open={showCreateChallenge} onClose={handleCloseModal}>
      <DialogTitle>Create Challenge</DialogTitle>
      <DialogContent>
        <CreateChallengeForm
          name={challengeName}
          goal={goal}
          communityId={communityId}
          setName={setChallengeName}
          setGoal={setGoal}
          setCommunityId={setCommunityId}></CreateChallengeForm>
      </DialogContent>
      <DialogActions>
        <button className="btn rounded-md" onClick={handleCloseModal}>
          Cancel
        </button>
        <button className="btn btn-info rounded-md" onClick={handleSubmit}>
          Create Challenge
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateChallengeModal;
