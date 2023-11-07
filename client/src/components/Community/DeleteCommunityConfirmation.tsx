import { Dialog, Button } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { showDeleteConfirmationAtom } from "../../recoil/communityAtoms";

const DeleteCommunityConfirmation = () => {
  const [showDeleteConfirmationCommunity, setShowDeleteConfirmationCommunity] =
    useRecoilState(showDeleteConfirmationAtom);
  return (
    <Dialog
      open={showDeleteConfirmationCommunity}
      onClose={() => setShowDeleteConfirmationCommunity(false)}
    >
      <Button
        sx={{ margin: 2 }}
        variant="contained"
        onClick={() => setShowDeleteConfirmationCommunity(false)}
      >
        OK
      </Button>
    </Dialog>
  );
};

export default DeleteCommunityConfirmation;
