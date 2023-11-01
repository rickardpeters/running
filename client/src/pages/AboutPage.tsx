import { Typography } from "@mui/material";
import Markdown from "react-markdown";
import React, { useEffect, useState } from "react";
import content from "../README.md";
import remarkGfm from "remark-gfm";

const AboutPage = () => {
  const file_name = "README.md";
  const [post, setPost] = useState("");

  useEffect(() => {
    fetch(content)
      .then((res) => res.text())
      .then((res) => setPost(res))
      .catch((err) => console.log(err));
  }, []);
  console.log(post);

  return (
    <div className="p-[5vh]">
      <Typography variant="h3" fontWeight="bold">
        About the project
      </Typography>
      <Markdown remarkPlugins={[remarkGfm]} children={post} />
    </div>
  );
};

export default AboutPage;
function componentDidMount() {
  throw new Error("Function not implemented.");
}
