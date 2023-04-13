import { useContext } from "react";
import { OrderContext, OrderContextState } from "./OrderContext";
import { StepContext, StepContextState } from "./StepContext";

const useStep = (): StepContextState => {
    const context = useContext(StepContext);
    if (!context) {
        throw new Error(
            'useStep must be used within a StepProvider'
        );
    }
    return context;
};

export default useStep;