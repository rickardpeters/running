import { Grid, TextField } from "@mui/material";
import { FirstOption, passwordStrength, Option } from "check-password-strength";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PasswordStrength from "./PasswordStrength";
import { useRecoilState } from "recoil";
import { passwordTestPassed } from "../../recoil/authAtoms";

interface PasswordFieldProps {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}
const PasswordField = (props: PasswordFieldProps) => {
  const customOptions: [FirstOption<string>, ...Option<string>[]] = [
    {
      id: 0,
      value: "Too weak",
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: "Weak",
      minDiversity: 2,
      minLength: 8,
    },
    {
      id: 2,
      value: "Medium",
      minDiversity: 4,
      minLength: 8,
    },
    {
      id: 3,
      value: "Strong",
      minDiversity: 4,
      minLength: 10,
    },
  ];

  const [passStrength, setStrength] = useState<number | null>(null);
  const [passwordTest, setPasswordTest] = useState("");
  const [testPassed, setTestPassed] = useRecoilState(passwordTestPassed);

  function testPassword(test: string) {
    if (test === props.password && test.length != 0) {
      setTestPassed(true);
    } else {
      setTestPassed(false);
    }
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    props.setPassword(newPassword);
    const strength = passwordStrength(newPassword, customOptions).id;
    setStrength(strength);
  };

  const handlePasswordTest = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordTest = event.target.value;
    setPasswordTest(newPasswordTest);
  };

  useEffect(() => {
    testPassword(passwordTest);
  }, [passwordTest, props.password]);
  return (
    <>
      <Grid item xs={6} style={{ marginBottom: "25px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="Password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          onChange={handlePassword}
        />
      </Grid>
      <Grid item xs={6}>
        {passwordTest.length == 0 || testPassed ? (
          <TextField
            autoFocus
            margin="dense"
            id="Re type Password"
            label="Enter Password Again"
            type="password"
            fullWidth
            variant="outlined"
            onChange={handlePasswordTest}
          />
        ) : (
          <TextField
            error
            id="outlined-error-helper-text"
            helperText="Passwords don't match"
            autoFocus
            margin="dense"
            label="Enter Password Again"
            type="password"
            fullWidth
            variant="outlined"
            onChange={handlePasswordTest}
          />
        )}
      </Grid>
      <Grid container spacing={2}>
        {passStrength != null && props.password.length != 0 && (
          <Grid item xs={6}>
            <PasswordStrength password={props.password} passStrength={passStrength} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PasswordField;
