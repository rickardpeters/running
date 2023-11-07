import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Context } from "../auth/AuthContextProvider";
import CommunityCard from "../Community/CommunityCard";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  joinedCommunitiesAtom,
  updateCommunityListAtom,
} from "../../recoil/communityAtoms";

const JoinedCommunities = () => {
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(
    joinedCommunitiesAtom
  );
  const updateCommunityList = useRecoilValue(updateCommunityListAtom);
  const user = useContext(Context);
  const uid = user.user.uid;
  const authToken = user.user.accessToken;

  useEffect(() => {
    getComm();
  }, []);

  useEffect(() => {
    getComm();
  }, [updateCommunityList]);

  const getComm = async () => {
    await axios
      .get(`http://127.0.0.1:8000/users/communities/${uid}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((resp) => {
        setJoinedCommunities(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="card justify-center m-4 lg:w-[24vw]">
      <div className="card-content justify-center m-4">
        <div className="card-title text-2xl justify-center m-4">
          Joined Communities
        </div>

        <div className="h-[100vh]  grid-flow-col overflow-y-auto overflow-x-visible justify-center">
          {joinedCommunities.map((community) => (
            <CommunityCard
              community={community}
              key={community.id}
              profileList={false}
            ></CommunityCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinedCommunities;
