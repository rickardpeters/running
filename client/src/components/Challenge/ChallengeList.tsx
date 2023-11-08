import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useContext, useEffect } from "react";
import CreateChallengeModal from "./CreateChallengeModal";
import { Context } from "../auth/AuthContextProvider";
import ChallengeCard from "./ChallengeCard";
import { onScreenAlertAtom } from "../../recoil/atoms";
import {
  challengesAtom,
  showCreateChallengeAtom,
  updateChallengeListAtom,
} from "../../recoil/challengeAtoms";
import { joinedCommunitiesAtom } from "../../recoil/communityAtoms";
import { runTotalsAtom } from "../../recoil/stravaAtoms";

const ChallengeList = () => {
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const user = useContext(Context);
  const uid = user.user.uid;
  const token = user.user.accessToken;
  const [challenges, setChallenges] = useRecoilState(challengesAtom);
  const [runTotals, setRunTotals] = useRecoilState(runTotalsAtom);
  const [showCreateChallenge, setShowCreateChallenge] = useRecoilState(
    showCreateChallengeAtom
  );
  const [updateChallengeList, setUpdateChallengeList] = useRecoilState(
    updateChallengeListAtom
  );

  const joinedCommunities = useRecoilValue(joinedCommunitiesAtom);

  async function fetchChallenges() {
    await axios
      .get(`http://127.0.0.1:8000/challenges/${uid}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setChallenges(resp.data);
      })
      .catch((error) => {
        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: "No challenges loaded",
        });
      });
  }

  const handleCreateChallenge = () => {
    setShowCreateChallenge(true);
  };

  //One for mount and unmount, one for creation.
  useEffect(() => {
    fetchChallenges();
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [updateChallengeList]);

  return (
    <div className="my-20">
      <div className="card place-items-center bg-slate-100 m-12 shadow-md rounded-md ">
        <div className="card-body">
          <div className="stat-value text-2xl my-2 text-center text-accent-content">
            Challenges
          </div>
          {joinedCommunities.length != 0 ? (
            <button
              className="btn btn-secondary rounded-sm mb-4"
              onClick={() => handleCreateChallenge()}
            >
              Create challenge
            </button>
          ) : (
            <button className="btn btn-disabled rounded-sm mb-4">
              Join a community to create a Challenge!
            </button>
          )}

          <div className="overflow-y-auto h-[50vh]">
            {Array.isArray(challenges) &&
              challenges
                .slice()
                .sort((a, b) => {
                  const differenceA = a.goal! - runTotals.distance / 1000;
                  const differenceB = b.goal! - runTotals.distance / 1000;
                  return differenceB - differenceA;
                })
                .map((challenge) => <ChallengeCard challenge={challenge} />)}
          </div>
        </div>
        <CreateChallengeModal />
      </div>
    </div>
  );
};

export default ChallengeList;
