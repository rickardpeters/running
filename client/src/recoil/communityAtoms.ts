import { atom } from "recoil";
import { Community } from "../types/types";

export const showCreateCommunityAtom = atom({
    key: "showCreateCommunityAtom",
    default: false,
  });
  
  export const showDeleteCommunityAtom = atom({
    key: "showDeleteCommunityAtom",
    default: false,
  });
  
  export const showUpdateCommunityAtom = atom({
    key: "showUpdateCommunityAtom",
    default: false,
  });

  export const showDeleteConfirmationAtom = atom({
    key: "showDeleteConfirmationAtom",
    default: false,
  });

  export const activeCommunityAtom = atom<Community | null>({
    key: "activeCommunityAtom",
    default: null,
  });

  export const updateCommunityListAtom = atom({
    key: "updateCommunityListAtom",
    default: false,
  });
  
  export const communitiesAtom = atom({
    key: "communitiesAtom",
    default: [] as Community[],
  });

  export const createCommunityAtom = atom<Community>({
    key: "createCommunityAtom",
   
    default: {community_name:"",id:null, description:"", members:[]},
  });

  export const joinedCommunitiesAtom = atom({
    key: "joinedCommunitiesAtom",
    default: [] as Community[],
  });