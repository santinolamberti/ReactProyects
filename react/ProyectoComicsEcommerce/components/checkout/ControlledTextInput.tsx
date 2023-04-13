import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useFormContext, useController } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type ControlledTextInputProps = {
  name: string;
  defaultValue?: string;
  label: string;
  widthText: string;
};

const ControlledTextInput: React.FC<ControlledTextInputProps> = ({
  name,
  label,
  defaultValue,
  widthText,
}: ControlledTextInputProps) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value, ref },
    formState: { errors },
  } = useController<Record<string, string>>({
    name: name,
    control,
    defaultValue,
  });

  return (
    <Box sx={{ width: "80%" }}>
      <TextField
        onChange={onChange}
        value={value}
        inputRef={ref}
        required
        label={label}
        error={!!errors[name]}
        helperText={`${errors[name]?.message || ""}`}
        sx={{ width: widthText, marginBottom: "10px" }}
      />
    </Box>
  );
};

export default ControlledTextInput;
