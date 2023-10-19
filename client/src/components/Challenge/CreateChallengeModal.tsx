import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  showCreateChallengeAtom,
  updateChallengeListAtom,
} from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import CreateChallengeForm from "./CreateChallengeForm";
import { getUserToken } from "../../utils";
import { auth } from "../../firebase";
import axios from "axios";

const CreateChallengeModal = () => {
  const [showCreateChallenge, setShowCreateChallenge] = useRecoilState(
    showCreateChallengeAtom
  );
  const [challengeName, setChallengeName] = useState("");
  const [goal, setGoal] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [updateChallengeList, setUpdateChallengeList] = useRecoilState(
    updateChallengeListAtom
  );

  const handleCloseModal = () => {
    setShowCreateChallenge(false);
    setUpdateChallengeList(true);
  };

  function formatCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  const formattedDateString = formatCurrentDate();

  const handleSubmit = async () => {
    const token = await getUserToken(auth);
    console.log("userToken: " + token);

    console.log(challengeName, goal);
    const newChallenge = {
      name: challengeName,
      start_date: formattedDateString,
      end_date: formattedDateString,
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
      const response = await axios.post(
        "http://127.0.0.1:8000/challenges/",
        newChallenge,
        config
      );
      console.log("challenge created:", response);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={showCreateChallenge} onClose={handleCloseModal}>
      <DialogTitle>Create Challenge</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <CreateChallengeForm
            name={challengeName}
            goal={goal}
            communityId={communityId}
            setName={setChallengeName}
            setGoal={setGoal}
            setCommunityId={setCommunityId}
          ></CreateChallengeForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create Challenge
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateChallengeModal;
