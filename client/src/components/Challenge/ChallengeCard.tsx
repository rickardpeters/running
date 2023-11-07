import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { joinedCommunitiesAtom, runTotalsAtom } from "../../recoil/atoms";
import { Challenge } from "../../types/types";

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const joinedCommunities = useRecoilValue(joinedCommunitiesAtom);
  const [runTotals, setRunTotals] = useRecoilState(runTotalsAtom);
  return (
    <div className="card shadow-md w-128 my-2 rounded-md bg-white">
      <div className="card-body">
        <div className="card-title">{challenge.name}</div>
        <div className="text-slate-500">
          {
            joinedCommunities.find(
              (community) => community.id === challenge.community_id
            )?.community_name
          }
        </div>
        <br />
        {runTotals.distance / 1000 >= challenge.goal!
          ? "Challenge complete!"
          : `${(runTotals.distance / 1000).toFixed(0)} of ${challenge.goal} km`}
        <br />

        <progress
          className="progress progress-info w-64 transition ease-in-out"
          value={runTotals.distance / 1000}
          max={challenge.goal!}
        />
      </div>
    </div>
  );
};

export default ChallengeCard;
