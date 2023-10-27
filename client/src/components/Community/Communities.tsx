import { Button, Container } from "@mui/material";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  communitiesAtom,
  showCreateCommunityAtom,
  updateCommunityListAtom,
} from "../../recoil/atoms";
import { useEffect, useState } from "react";
import CreateCommunityModal from "./CreateCommunityModal";
import CommunityCard from "./CommunityCard";
import { Community } from "../../types/types";

const Communities = () => {
  const [communities, setCommunities] = useRecoilState(communitiesAtom);
  const [showCreateCommunity, setShowCreateCommunity] = useRecoilState(
    showCreateCommunityAtom
  );
  const [deleteCommunity, setDeleteCommunity] = useState<Community | null>(
    null
  );

  const updateCommunityList = useRecoilValue(updateCommunityListAtom);

  async function fetchCommunities() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/communities", {
        headers: {
          // Authorization: `Token ${authToken}`,
        },
      });
      console.warn(response.data);
      setCommunities(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //Checks if updateCommunityList state changes, triggering the useEffect.
  useEffect(() => {
    fetchCommunities();
  }, [updateCommunityList]);

  return (
    <Container style={{ marginTop: "25px" }}>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {communities.map((community, index) => (
          <>
            <CommunityCard community={community} key={index}></CommunityCard>
          </>
        ))}
      </Container>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ mb: 1.5 }}
          variant="contained"
          onClick={() => setShowCreateCommunity(true)}
        >
          Create new community
        </Button>
      </Container>
      <CreateCommunityModal />
    </Container>
  );
};

export default Communities;
