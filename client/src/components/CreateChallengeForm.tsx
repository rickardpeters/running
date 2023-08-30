import { Button, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

interface createChallengeFormProps {
  name: string;
  goal: string;
  setName: Dispatch<SetStateAction<string>>;
  setGoal: Dispatch<SetStateAction<string>>;
}

const CreateChallengeForm = (props: createChallengeFormProps) => {
  const handleChallengeNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    props.setName(event.target.value);
  };

  const handleDescriptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    props.setGoal(event.target.value);
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
        onChange={handleDescriptionChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
    </>
  );
};

export default CreateChallengeForm;
