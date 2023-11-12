import React, { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useRecoilState } from "recoil";
import CreateChallengeForm from "./CreateChallengeForm";
import axios from "axios";
import { Context } from "../auth/AuthContextProvider";
import { onScreenAlertAtom } from "../../recoil/atoms";
import { showCreateChallengeAtom, updateChallengeListAtom, createChallenge } from "../../recoil/challengeAtoms";

const CreateChallengeModal = () => {
  const user = useContext(Context);
  const uid = user.user.uid;
  const token = user.user.accessToken;
  const [showCreateChallenge, setShowCreateChallenge] = useRecoilState(showCreateChallengeAtom);
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

  const [updateChallengeList, setUpdateChallengeList] = useRecoilState(updateChallengeListAtom);
  const [challengeProps, setChallengeProps] = useRecoilState(createChallenge);
  const { name, goal, community_id } = challengeProps;

  const handleCloseModal = () => {
    setShowCreateChallenge(false);
    setChallengeProps({ name: "", goal: null, community_id: null });
  };

  const handleSubmit = async () => {
    const newChallenge = {
      name: name,
      goal: goal,
      community_id: community_id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(`http://127.0.0.1:8000/challenges/${uid}/`, newChallenge, config)
      .then((response) => {
        handleCloseModal();
        setUpdateChallengeList(!updateChallengeList);
        setChallengeProps({ name: "", goal: null, community_id: null });
      })

      .catch((error) => {
        console.error(error);
        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: "Unable to create Challenge",
        });
      });
  };

  return (
    <Dialog open={showCreateChallenge} onClose={handleCloseModal}>
      <DialogTitle>Create Challenge</DialogTitle>
      <DialogContent>
        <CreateChallengeForm />
      </DialogContent>
      <DialogActions>
        <button className="btn rounded-md" onClick={handleCloseModal}>
          Cancel
        </button>
        {name != "" && goal != 0 && community_id != null ? (
          <button className="btn btn-info rounded-md" onClick={handleSubmit}>
            Create Challenge
          </button>
        ) : (
          <button className="btn btn-disabled rounded-md">Create Challenge</button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateChallengeModal;
