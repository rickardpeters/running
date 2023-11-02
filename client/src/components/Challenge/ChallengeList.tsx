import { useRecoilState } from "recoil";
import { challengesAtom, runTotalsAtom, showCreateChallengeAtom, updateChallengeListAtom } from "../../recoil/atoms";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Container, Card, CardContent, Typography, CardActionArea, Grid, LinearProgress } from "@mui/material";
import CreateChallengeModal from "./CreateChallengeModal";
import { Context } from "../auth/AuthContextProvider";

const ChallengeList = () => {
  const user = useContext(Context);
  const uid = user.user.uid;
  const token = user.user.token;
  const [challenges, setChallenges] = useRecoilState(challengesAtom);
  const [runTotals, setRunTotals] = useRecoilState(runTotalsAtom);
  const [showCreateChallenge, setShowCreateChallenge] = useRecoilState(showCreateChallengeAtom);
  const [updateChallengeList, setUpdateChallengeList] = useRecoilState(updateChallengeListAtom);

  async function fetchChallenges() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/challenges/${uid}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setChallenges(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreateChallenge = () => {
    setShowCreateChallenge(true);
    console.log("create challenge");
    console.log(showCreateChallenge);
  };

  useEffect(() => {
    fetchChallenges();
  }, [updateChallengeList]);

  return (
    <div className="my-20">
      <div className="card place-items-center bg-slate-100 m-12 shadow-md">
        <div className="card-body">
          <div className="stat-value text-2xl my-2 text-center text-accent-content">Challenges</div>
          <div>
            {challenges
              .slice()
              .sort((a, b) => {
                const differenceA = a.goal - runTotals.distance / 1000;
                const differenceB = b.goal - runTotals.distance / 1000;
                return differenceB - differenceA;
              })
              .map((challenge) => (
                <div className="card shadow-md w-128 my-2 bg-white">
                  <div className="card-body">
                    <div className="card-title">{challenge.name}</div>

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
        <button className="btn btn-secondary rounded-sm mb-4" onClick={() => handleCreateChallenge()}>
          Create challenge
        </button>
        <CreateChallengeModal />
      </div>
    </div>
  );
};

export default ChallengeList;
