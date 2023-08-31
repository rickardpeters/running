import { TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface createChallengeFormProps {
  name: string;
  goal: string;
  communityId: string;
  setName: Dispatch<SetStateAction<string>>;
  setGoal: Dispatch<SetStateAction<string>>;
  setCommunityId: Dispatch<SetStateAction<string>>;
}

const CreateChallengeForm = (props: createChallengeFormProps) => {
  const handleChallengeNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    props.setName(event.target.value);
  };

  const handleGoalChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    props.setGoal(event.target.value);
  };

  const handleCommunityIdChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    props.setCommunityId(event.target.value);
  };

  return (
    <>
      <TextField
        label="Challenge Name"
        value={props.name}
        onChange={handleChallengeNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Goal (km)"
        value={props.goal}
        onChange={handleGoalChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Community ID"
        value={props.communityId}
        onChange={handleCommunityIdChange}
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default CreateChallengeForm;
