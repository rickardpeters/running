import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { joinedCommunitiesAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

interface createChallengeFormProps {
  name: string;
  goal: string;
  communityId: string;
  setName: Dispatch<SetStateAction<string>>;
  setGoal: Dispatch<SetStateAction<string>>;
  setCommunityId: Dispatch<SetStateAction<string>>;
}

const CreateChallengeForm = (props: createChallengeFormProps) => {
  //props.setCommunityId(""); // Det här är bara för att få till något typ av "placeholder-beteende" i select nedan..

  const [joinedCommunities, setJoinedCommunities] = useRecoilState(joinedCommunitiesAtom);

  const handleChallengeNameChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    props.setName(event.target.value);
  };

  const handleGoalChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    props.setGoal(event.target.value);
  };

  const handleCommunityIdChange = (event: { target: { value: React.SetStateAction<string> } }) => {
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
      <TextField label="Goal (km)" value={props.goal} onChange={handleGoalChange} fullWidth margin="normal" />
      <Select
        labelId="select-community"
        value={props.communityId}
        onChange={handleCommunityIdChange}
        displayEmpty
        fullWidth>
        <MenuItem value="" disabled>
          Select Community
        </MenuItem>
        {joinedCommunities.map((community) => (
          <MenuItem key={community.id} value={community.id}>
            {community.community_name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default CreateChallengeForm;
