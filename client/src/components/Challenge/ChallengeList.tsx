import { useRecoilState, useRecoilValue } from "recoil";
import {
  challengesAtom,
  onScreenAlertAtom,
  runTotalsAtom,
  showCreateChallengeAtom,
  updateChallengeListAtom,
  joinedCommunitiesAtom,
} from "../../recoil/atoms";
import axios from "axios";
import { useContext, useEffect } from "react";
import CreateChallengeModal from "./CreateChallengeModal";
import { Context } from "../auth/AuthContextProvider";

const ChallengeList = () => {
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const user = useContext(Context);
  const uid = user.user.uid;
  const token = user.user.token;
  const [challenges, setChallenges] = useRecoilState(challengesAtom);
  const [runTotals, setRunTotals] = useRecoilState(runTotalsAtom);
  const [showCreateChallenge, setShowCreateChallenge] = useRecoilState(showCreateChallengeAtom);
  const [updateChallengeList, setUpdateChallengeList] = useRecoilState(updateChallengeListAtom);
  const joinedCommunities = useRecoilValue(joinedCommunitiesAtom);

  async function fetchChallenges() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/challenges/${uid}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setChallenges(response.data);
    } catch (error) {
      setAlert({
        showSnack: true,
        snackColor: "error",
        snackMessage: "No challenges loaded",
      });
    }
  }

  const handleCreateChallenge = () => {
    setShowCreateChallenge(true);
    console.log("create challenge");
    console.log(showCreateChallenge);
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
      <div className="card place-items-center bg-slate-100 m-12 shadow-md rounded-md">
        <div className="card-body">
          <div className="stat-value text-2xl my-2 text-center text-accent-content">Challenges</div>
          <button className="btn btn-secondary rounded-sm mb-4" onClick={() => handleCreateChallenge()}>
            Create challenge
          </button>
          <div>
            {Array.isArray(challenges) &&
              challenges
                .slice()
                .sort((a, b) => {
                  const differenceA = a.goal - runTotals.distance / 1000;
                  const differenceB = b.goal - runTotals.distance / 1000;
                  return differenceB - differenceA;
                })
                .map((challenge) => (
                  <div className="card shadow-md w-128 my-2 rounded-md bg-white">
                    <div className="card-body">
                      <div className="card-title">{challenge.name}</div>
                      <div className="text-slate-500">
                        {joinedCommunities.find((community) => community.id === challenge.community_id)?.community_name}
                      </div>
                      <br />
                      {runTotals.distance / 1000 >= challenge.goal
                        ? "Challenge complete!"
                        : `${(runTotals.distance / 1000).toFixed(0)} of ${challenge.goal} km`}
                      <br />

                      <progress
                        className="progress progress-info w-64 transition ease-in-out"
                        value={runTotals.distance / 1000}
                        max={challenge.goal}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <CreateChallengeModal />
      </div>
    </div>
  );
};

export default ChallengeList;
