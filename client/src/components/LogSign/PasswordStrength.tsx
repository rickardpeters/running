import { Grid, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { passwordStrengthTestPassed } from "../../recoil/authAtoms";

interface PasswordStrengthProps {
  password: string;
  passStrength: number;
}

const PasswordStrength = (props: PasswordStrengthProps) => {
  const [color, setColor] = useState<"primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit">(
    "primary"
  );
  const [message, setMessage] = useState("");
  const [strengthTest, setStrengthTest] = useRecoilState(passwordStrengthTestPassed);

  const normalize = (value: number) => ((value - 0) * 100) / 3;

  useEffect(() => {
    if (props.passStrength == 0) {
      setColor("error");
      setMessage("The password is too Weak");
      setStrengthTest(false);
    } else if (props.passStrength == 1) {
      setColor("warning");
      setMessage("The password is Weak");
      setStrengthTest(true);
    } else if (props.passStrength == 2) {
      setColor("info");
      setMessage("The password is Strong");
      setStrengthTest(true);
    } else {
      setColor("success");
      setMessage("The password is very Strong");
      setStrengthTest(true);
    }
  }, [props.passStrength]);

  return (
    <Grid item xs={10} style={{ marginLeft: "30px" }}>
      <React.Fragment>
        {props.password.length != 0 && (
          <LinearProgress
            variant="determinate"
            value={normalize(props.passStrength)}
            color={color}
            style={{ marginBottom: "10px" }}
          />
        )}
      </React.Fragment>
      <Typography>{message}</Typography>
    </Grid>
  );
};

export default PasswordStrength;
