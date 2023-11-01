import { Container, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../auth/AuthContextProvider";
import CommunityCard from "../Community/CommunityCard";

const JoinedCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const user = useContext(Context);
  const uid = user.user.uid;
  const authToken = user.user.accessToken;

  useEffect(() => {
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
    getComm();
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1.5rem",
      }}>
      <>
        <Card sx={{ width: "350px" }}>
          <Typography fontWeight={"bold"} sx={{ m: 1 }}>
            Joined Communities
            <CardContent>
              {communities.map((comm) => (
                <CommunityCard community={comm} profileList={false}></CommunityCard>
              ))}
            </CardContent>
          </Typography>
        </Card>
      </>
    </Container>
  );
};

export default JoinedCommunities;
