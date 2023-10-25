import Box from "@mui/material/Box";
import MapComponent from "./MapComponent";
import MessagingComponent from "./MessagingComponent";

const Mainfeed = () => {
  return (
    <Box
      sx={{
        width: 600,
        overflowY: "auto",
        m: 1,
        p: 1,
        justifyContent: "space-between",
      }}
    >
      <MessagingComponent></MessagingComponent>
    </Box>
  );
};

export default Mainfeed;
