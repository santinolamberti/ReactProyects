import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useStep from "../useStep";

export type StepperProps = {
  handleSubmit: () => void;
};

const StepperNavigation: React.FC<StepperProps> = ({ handleSubmit }) => {
  // const stepActions = React.useContext(StepContext) as StepActions;
  const { state: stepState, dispatch: stepperDispatch } = useStep();

  const handlePrev = () => {
    stepperDispatch({
      type: "SET_STEP",
      payload: --stepState.step.step
    });
  }

  return (
    <Stack direction="row" mt={2}>
      {stepState.step.step !== 0 && (
        <Button variant="contained" onClick={handlePrev}>Anterior</Button>
      )}
      <Box sx={{ flex: "1 1 auto" }} />
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        {stepState.step.step === 0 || stepState.step.step === 1
          ? "Siguiente"
          : "Finalizar"}
      </Button>
    </Stack>
  );
};

export default StepperNavigation;
