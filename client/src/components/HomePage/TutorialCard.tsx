import React from "react";
import { TutorialCardProps } from "../../types/types";
import { Link } from "react-router-dom";

const TutorialCard = (props: TutorialCardProps) => {
  const { title, content, btnText, link } = props.card;
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl m-[5vw] rounded-md m">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{content}</p>
          <div className="card-actions justify-center w-full">
            <Link to={link}>
              <button className="btn btn-info rounded-md">{btnText}</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialCard;
