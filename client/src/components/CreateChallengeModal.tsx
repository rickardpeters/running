import React, { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { showCreateChallengeAtom } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import CreateChallengeForm from "./CreateChallengeForm";
import { getUserToken } from "../utils";
import { auth } from "../firebase";
import axios from "axios";

const CreateChallengeModal = () => {
  const [showCreateChallenge, setShowCreateChallenge] = useRecoilState(
    showCreateChallengeAtom
  );
  const [challengeName, setChallengeName] = useState("");
  const [goal, setGoal] = useState("");

  const handleCloseModal = () => {
    setShowCreateChallenge(false);
  };

  const handleSubmit = async () => {
    const token = await getUserToken(auth);

    console.log(goal, challengeName);
    const newChallenge = {
      name: challengeName,
      goal: goal,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8500/challenges/",
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
      <DialogTitle>Create Community</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <CreateChallengeForm
            name={challengeName}
            goal={goal}
            setName={setChallengeName}
            setGoal={setGoal}
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
