import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  showDeleteCommunityAtom,
  showDeleteConfirmationAtom,
} from "../../recoil/atoms";

const DeleteCommunityConfirmation = () => {
  const [showDeleteConfirmationCommunity, setShowDeleteConfirmationCommunity] =
    useRecoilState(showDeleteConfirmationAtom);
  return (
    <Dialog
      open={showDeleteConfirmationCommunity}
      onClose={() => setShowDeleteConfirmationCommunity(false)}
    >
      <DialogTitle sx={{ textAlign: "center" }}>Delete successful!</DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        Community deleted.
      </DialogContent>
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
