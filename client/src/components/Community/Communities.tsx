import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { useContext, useEffect, useState } from "react";
import CreateCommunityModal from "./CreateCommunityModal";
import CommunityCard from "./CommunityCard";
import { Context } from "../auth/AuthContextProvider";
import { onScreenAlertAtom } from "../../recoil/atoms";
import { communitiesAtom, showCreateCommunityAtom, updateCommunityListAtom } from "../../recoil/communityAtoms";

const Communities = () => {
  const user = useContext(Context);
  const uid = user.user.uid;
  const token = user.user.accessToken;
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const [communities, setCommunities] = useRecoilState(communitiesAtom);
  const [showCreateCommunity, setShowCreateCommunity] = useRecoilState(showCreateCommunityAtom);
  const updateCommunityList = useRecoilValue(updateCommunityListAtom);

  async function fetchCommunities() {
    await axios
      .get("http://127.0.0.1:8000/communities/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCommunities(response.data);
      })
      .catch((error) => {
        console.error(error.message);
        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: "Unable to fetch Communities",
        });
      });
  }

  useEffect(() => {
    fetchCommunities();
  }, [updateCommunityList]);

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center">
        <button
          className="btn btn-info rounded-md left-[50%] mt-6 hover:scale-105"
          onClick={() => setShowCreateCommunity(true)}>
          Create new community
        </button>
      </div>
      <div className="justify-center m-3 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {communities.map((community) => (
          <>
            <CommunityCard community={community} key={community.id} profileList={false}></CommunityCard>
          </>
        ))}
      </div>

      <CreateCommunityModal />
    </div>
  );
};

export default Communities;
