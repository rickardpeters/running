import { Button, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

interface createCommunityFormProps {
    name: string;
    description: string;
    setName: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
}

const CreateCommunityForm = (props: createCommunityFormProps) => {
 

  const handleCommunityNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    props.setName(event.target.value);
  };

  const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    props.setDescription(event.target.value);
  };

  return (
    <>
      <TextField
        label="Community Name"
        value={props.name}
        onChange={handleCommunityNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description of Community"
        value={props.description}
        onChange={handleDescriptionChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      
    </>
  );
};

export default CreateCommunityForm;
