import { Grid, LinearProgress, Typography } from "@mui/material";
import { passwordStrength } from "check-password-strength";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { passwordStrengthTestPassed } from "../recoil/atoms";

interface PasswordStrengthProps {
  password: string;
  passStrength: number;
}

const PasswordStrength = (props: PasswordStrengthProps) => {
  const [color, setColor] = useState<
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
  >("primary");
  const [message, setMessage] = useState("");
  const [strengthTest, setStrenthTest] = useRecoilState(passwordStrengthTestPassed);

  const normalise = (value: number) => ((value - 0) * 100) / 3;

  useEffect(() => {
    console.log("strength effect", props.passStrength);
    if (props.passStrength == 0) {
      setColor("error");
      setMessage("The password is too Weak");
      setStrenthTest(false)
    } else if (props.passStrength == 1) {
      setColor("warning");
      setMessage("The password is Weak");
      setStrenthTest(true)
    } else if (props.passStrength == 2) {
      setColor("info");
      setMessage("The password is Strong");
      setStrenthTest(true)
    } else {
      setColor("success");
      setMessage("The password is very Strong");
      setStrenthTest(true)
    }
  }, [props.passStrength]);

  return (
    <Grid  item xs={10} style={{ marginLeft: '30px'}}>
      
        <React.Fragment>
          {props.password.length != 0 && (
            <LinearProgress
              variant="determinate"
              value={normalise(props.passStrength)}
              color={color}
              style={{ marginBottom: '10px'}}
            />
          )}
        </React.Fragment>
        <Typography>{message}</Typography>
      
    </Grid>
  );
};

export default PasswordStrength;
