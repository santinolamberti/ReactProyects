import * as React from 'react';
import { CardSelection } from 'integrador/components/deposit/card-selection.component';
import useStep from 'integrador/components/contexts/useStep';
import { useEffect } from 'react';
import { AmountSelection } from 'integrador/components/deposit/amount-selection.component';
import { DepositConfirmation } from 'integrador/components/deposit/deposit-confirmation.component';
import ChargeMoneyCVU from './CVU-selection.component';

type DepositProps = {
  page: "card" | "transferences"
}

export const Deposit:React.FC<DepositProps> = ({page} : DepositProps) => {

    const { state: stepState, dispatch: stepperDispatch } = useStep();

    useEffect(() => {
        stepperDispatch({
          type: "SET_STEP",
          payload: 0
        });
      }, [])

    return (
        <>
            {stepState.step.step === 0 && (page == "card" ? <CardSelection/> : <ChargeMoneyCVU />)} 
            {stepState.step.step === 1 && <AmountSelection/>}
            {stepState.step.step === 2 && <DepositConfirmation page={page}/>}
        </>
        
    )
}