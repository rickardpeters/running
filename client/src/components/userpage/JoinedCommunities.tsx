import { Container, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../auth/AuthContextProvider";
import CommunityCard from "../Community/CommunityCard";
import { updateCommunityListAtom } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";

const JoinedCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const updateCommunityList = useRecoilValue(updateCommunityListAtom);
  const user = useContext(Context);
  const uid = user.user.uid;
  const authToken = user.user.accessToken;

  useEffect(() => {
    getComm();
  }, [updateCommunityList]);

  const getComm = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/communities/${uid}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      console.warn(response.data);
      setCommunities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card justify-center m-4 lg:w-[24vw]">
      <div className="card-content justify-center m-4">
        <div className="card-title text-2xl justify-center m-4">Joined Communities</div>

        <div className="h-[100vh] grid-flow-col overflow-y-auto justify-center">
          {communities.map((community, index) => (
            <CommunityCard community={community} key={index} profileList={false}></CommunityCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinedCommunities;
