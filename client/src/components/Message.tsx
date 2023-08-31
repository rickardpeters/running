import React from "react";

import { Box, Typography, Avatar } from "@mui/material";

const Message = ({ message }: any) => {
  return (
    <Box
      sx={{
        borderRadius: "20px 20px 20px 0",
        p: 1,
        backgroundColor: "#4086F1",
        width: "60%",
        display: "flex",
        alignItems: "flex-start",
        mb: 1,
      }}
    >
      <Avatar
        alt="Avatar"
        sx={{
          height: 35,
          width: 35,
          mr: 2,
        }}
      />
      <Typography sx={{ color: "white" }}>{message.name}</Typography>
      <Typography sx={{ color: "white" }}>{message.text}</Typography>
    </Box>
  );
};

export default Message;
