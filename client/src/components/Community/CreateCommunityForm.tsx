import { TextField } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { createCommunityAtom } from "../../recoil/communityAtoms";

const CreateCommunityForm = () => {
  const [createCommunity, setCreateCommunity] =
    useRecoilState(createCommunityAtom);

  const { community_name, description } = createCommunity;

  const handleCommunityNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreateCommunity({
      ...createCommunity,
      community_name: event.target.value,
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreateCommunity({ ...createCommunity, description: event.target.value });
  };

  return (
    <>
      <TextField
        label="Community Name"
        value={community_name}
        onChange={handleCommunityNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description of Community"
        value={description}
        onChange={handleDescriptionChange}
        fullWidth
        margin="normal"
        multiline
        rows={2}
      />
    </>
  );
};

export default CreateCommunityForm;
