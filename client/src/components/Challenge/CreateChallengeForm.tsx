import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { useRecoilState } from "recoil";
import { createChallenge } from "../../recoil/challengeAtoms";
import { joinedCommunitiesAtom } from "../../recoil/communityAtoms";

const CreateChallengeForm = () => {
  const [challengeProps, setChallengeProps] = useRecoilState(createChallenge);
  const { name, goal, community_id } = challengeProps;
  const [selectComm, setSelectComm] = useState("");
  const [selectGoal, setSelectGoal] = useState("");

  const [joinedCommunities, setJoinedCommunities] = useRecoilState(
    joinedCommunitiesAtom
  );

  const handleChallengeNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setChallengeProps({ ...challengeProps, name: e.target.value });
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const goal = parseInt(e.target.value, 10);
    console.log(e.target.value);
    setChallengeProps({ ...challengeProps, goal: goal });
    setSelectGoal(e.target.value);
  };

  const handleCommunityIdChange = (e: SelectChangeEvent) => {
    e.preventDefault();
    const comm = parseInt(e.target.value, 10);
    console.log(e.target.value);
    setChallengeProps({ ...challengeProps, community_id: comm });
    setSelectComm(e.target.value);
  };

  return (
    <>
      <TextField
        label="Challenge Name"
        value={name}
        onChange={handleChallengeNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Goal (km)"
        placeholder="Goal (km)"
        value={selectGoal}
        type="number"
        onChange={handleGoalChange}
        fullWidth
        margin="normal"
      />

      <Select
        labelId="select-community"
        placeholder="Community"
        type="number"
        value={selectComm}
        onChange={handleCommunityIdChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>
          Select Community
        </MenuItem>
        {joinedCommunities.map((community) => (
          <MenuItem key={community.id!} value={community.id!}>
            {community.community_name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default CreateChallengeForm;
